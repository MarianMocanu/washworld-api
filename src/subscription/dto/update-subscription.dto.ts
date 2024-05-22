import { PartialType } from '@nestjs/mapped-types';
import { CreateSubscriptionDto } from './create-subscription.dto';

export class UpdateSubscriptionDto extends PartialType(CreateSubscriptionDto) {
  constructor(active: boolean, expiresAt: Date) {
    super();
    (this.active = active), (this.expiresAt = expiresAt);
  }
  active: boolean;
  expiresAt: Date;
}
