"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lambda = void 0;
const lambda = (event, context) => __awaiter(void 0, void 0, void 0, function* () {
    const saludar = 'Hola Typescript';
    console.log(saludar);
    const response = {
        statusCode: 200,
        body: JSON.stringify(event)
    };
    return response;
});
exports.lambda = lambda;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFtYmRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xhbWJkYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFPTyxNQUFNLE1BQU0sR0FBc0MsQ0FBTyxLQUFvQixFQUFFLE9BQWdCLEVBQXNCLEVBQUU7SUFDMUgsTUFBTSxPQUFPLEdBQVcsaUJBQWlCLENBQUE7SUFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUVyQixNQUFNLFFBQVEsR0FBYztRQUN4QixVQUFVLEVBQUUsR0FBRztRQUNmLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztLQUM5QixDQUFBO0lBRUQsT0FBTyxRQUFRLENBQUM7QUFDcEIsQ0FBQyxDQUFBLENBQUE7QUFWWSxRQUFBLE1BQU0sVUFVbEIifQ==