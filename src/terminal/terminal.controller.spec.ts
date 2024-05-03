import { Test, TestingModule } from '@nestjs/testing';
import { TerminalController } from './terminal.controller';
import { TerminalService } from './terminal.service';

describe('TerminalController', () => {
  let controller: TerminalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TerminalController],
      providers: [TerminalService],
    }).compile();

    controller = module.get<TerminalController>(TerminalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
