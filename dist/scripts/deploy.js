"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const shelljs_1 = __importDefault(require("shelljs"));
const fs_1 = require("fs");
const jszip_1 = __importDefault(require("jszip"));
const AWS = __importStar(require("aws-sdk"));
const ora_1 = __importDefault(require("ora"));
const config = {
    aws: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.DEFULT_REGION
    }
};
// Compile ts to js
const compile = () => __awaiter(void 0, void 0, void 0, function* () {
    shelljs_1.default.exec("npm run build");
    const dir = fs_1.readdirSync('C:/Users/IncluIT-NB/Desktop/aws-typescript/dist/src');
    console.log(dir);
    return dir;
});
// Create zip
const createZip = (codes) => __awaiter(void 0, void 0, void 0, function* () {
    const zip = new jszip_1.default();
    codes.forEach(code => zip.file(`${code}`, code));
    // zip.file('index.js', code);
    const zipFiles = yield zip.generateAsync({ type: 'nodebuffer' });
    console.log(zipFiles);
    return zipFiles;
});
// upload to aws
const uploadToAws = (zipFile) => __awaiter(void 0, void 0, void 0, function* () {
    const lambda = new AWS.Lambda(config.aws);
    const res = yield lambda.updateFunctionCode({
        FunctionName: 'lambda-ts-example',
        ZipFile: zipFile
    }).promise();
    return res.CodeSize;
});
// Main function
const deploy = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const spinner = ora_1.default();
        const code = yield compile();
        spinner.start('Creating an zip.');
        const zipFile = yield createZip(code);
        spinner.succeed('The zip file was created successfully.');
        spinner.start('Creating an lambda function.');
        yield uploadToAws(zipFile);
        spinner.succeed('The deploy of the lambda function completed successfully.');
    }
    catch (error) {
        console.error('Error deploying lambda function. [ERROR]: ', error);
    }
});
// Excecute script.
(() => __awaiter(void 0, void 0, void 0, function* () { return yield deploy(); }))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc2NyaXB0cy9kZXBsb3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQWlDO0FBQ2pDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQTtBQUVmLHNEQUE0QjtBQUM1QiwyQkFBcUM7QUFDckMsa0RBQTBCO0FBQzFCLDZDQUErQjtBQUMvQiw4Q0FBc0I7QUFFdEIsTUFBTSxNQUFNLEdBQUc7SUFDWCxHQUFHLEVBQUU7UUFDRCxXQUFXLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUI7UUFDMUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCO1FBQ2xELE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWE7S0FDcEM7Q0FDSixDQUFBO0FBRUQsbUJBQW1CO0FBQ25CLE1BQU0sT0FBTyxHQUFHLEdBQTRCLEVBQUU7SUFDMUMsaUJBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDNUIsTUFBTSxHQUFHLEdBQUcsZ0JBQVcsQ0FBQyxxREFBcUQsQ0FBQyxDQUFBO0lBRTlFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakIsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDLENBQUEsQ0FBQTtBQUVELGFBQWE7QUFDYixNQUFNLFNBQVMsR0FBRyxDQUFPLEtBQWUsRUFBbUIsRUFBRTtJQUN6RCxNQUFNLEdBQUcsR0FBRyxJQUFJLGVBQUssRUFBRSxDQUFDO0lBQ3hCLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQTtJQUNoRCw4QkFBOEI7SUFDOUIsTUFBTSxRQUFRLEdBQUcsTUFBTSxHQUFHLENBQUMsYUFBYSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7SUFDakUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0QixPQUFPLFFBQVEsQ0FBQztBQUNwQixDQUFDLENBQUEsQ0FBQztBQUVGLGdCQUFnQjtBQUNoQixNQUFNLFdBQVcsR0FBRyxDQUFPLE9BQWUsRUFBK0IsRUFBRTtJQUN2RSxNQUFNLE1BQU0sR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFDLE1BQU0sR0FBRyxHQUFHLE1BQU0sTUFBTSxDQUFDLGtCQUFrQixDQUFDO1FBQ3hDLFlBQVksRUFBRSxtQkFBbUI7UUFDakMsT0FBTyxFQUFFLE9BQU87S0FDbkIsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ1osT0FBTyxHQUFHLENBQUMsUUFBUSxDQUFDO0FBQ3hCLENBQUMsQ0FBQSxDQUFBO0FBRUQsZ0JBQWdCO0FBQ2hCLE1BQU0sTUFBTSxHQUFHLEdBQXdCLEVBQUU7SUFDckMsSUFBSTtRQUNBLE1BQU0sT0FBTyxHQUFHLGFBQUcsRUFBRSxDQUFDO1FBQ3RCLE1BQU0sSUFBSSxHQUFHLE1BQU0sT0FBTyxFQUFFLENBQUM7UUFFN0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sT0FBTyxHQUFHLE1BQU0sU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxPQUFPLENBQUMsd0NBQXdDLENBQUMsQ0FBQTtRQUV6RCxPQUFPLENBQUMsS0FBSyxDQUFDLDhCQUE4QixDQUFDLENBQUM7UUFDOUMsTUFBTSxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0IsT0FBTyxDQUFDLE9BQU8sQ0FBQywyREFBMkQsQ0FBQyxDQUFBO0tBQy9FO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDWixPQUFPLENBQUMsS0FBSyxDQUFDLDRDQUE0QyxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ3RFO0FBQ0wsQ0FBQyxDQUFBLENBQUE7QUFFRCxtQkFBbUI7QUFDbkIsQ0FBRSxHQUFTLEVBQUUsa0RBQUMsT0FBQSxNQUFNLE1BQU0sRUFBRSxDQUFBLEdBQUEsQ0FBRSxFQUFFLENBQUEifQ==