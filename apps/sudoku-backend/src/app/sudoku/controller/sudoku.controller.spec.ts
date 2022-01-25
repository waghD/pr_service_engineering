import { Test, TestingModule } from "@nestjs/testing";
import { SudokuController } from "./sudoku.controller";
import { SudokuService } from "../service/sudoku.service";

describe("SudokuController", () => {
  let controller: SudokuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SudokuController],
      providers: [{
        provide: SudokuService,
        useValue: {}
      }]
    }).compile();

    controller = module.get<SudokuController>(SudokuController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
