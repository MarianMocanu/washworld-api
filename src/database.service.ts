import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async executeSQL(sql: string): Promise<void> {
    this.logger.debug(`Executing SQL: ${sql}`);
    await this.dataSource.query(sql);
    this.logger.debug('SQL executed successfully');
  }

  async createStoredProcedure(): Promise<void> {
    const sql = `
    create or replace procedure create_invoice(p_event_id INT)
    language plpgsql
    as
    $$
    declare
        p_subscription_id int;
        p_invoiced_amount numeric;
    begin

        -- select subscription id for the event
        
        select subscription.id
        into p_subscription_id
        from event
            inner join car on event."carId" = car.id
            inner join subscription on car.id = subscription."carId"
        where event.id = p_event_id;

        -- if subscription id exists

        if p_subscription_id is not null then
            p_invoiced_amount := 0;
            
            -- if subscription id does not exist
            
        else
            select service.price
            into p_invoiced_amount
            from event
                    inner join service on event."serviceId" = service.id
            where event.id = p_event_id;
        end if;

        -- insert row into invoice table
        insert into invoice (amount, "createdAt", "updatedAt", "subscriptionId", "eventId")
        values (p_invoiced_amount, now(), now(), p_subscription_id, p_event_id);
    end;
    $$;
`;
    await this.executeSQL(sql);
    this.logger.log('Stored procedure create_invoice created successfully.');
  }

  async createTriggerFunction(): Promise<void> {
    const sql = `
    create or replace function trigger_create_invoice()
    returns trigger
    language plpgsql
    as
    $$
    begin
        call create_invoice(new.id);
        return new;
    end;
    $$;
    `;
    await this.executeSQL(sql);
    this.logger.log('Trigger function trigger_create_invoice created successfully.');
  }

  async createTrigger(): Promise<void> {
    const dropSQL = `
    do 
    $$
    begin
        if exists (select 1 from pg_trigger where tgname = 'create_invoice_after_event_insert') 
            then drop trigger create_invoice_after_event_insert on event;
        end if;
    end
    $$;
    `;
    await this.executeSQL(dropSQL);
    this.logger.log('Trigger create_invoice_after_event_insert dropped successfully.');

    const createSQL = `
    create trigger create_invoice_after_event_insert
    after insert
    on event
    for each row
    execute function trigger_create_invoice();
    `;
    await this.executeSQL(createSQL);
    this.logger.log('Trigger create_invoice_after_event_insert created successfully.');
  }

  async onModuleInit(): Promise<void> {
    await this.createStoredProcedure();
    await this.createTriggerFunction();
    await this.createTrigger();
  }
}
