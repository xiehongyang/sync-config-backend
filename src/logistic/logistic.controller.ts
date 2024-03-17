import { Body, Controller, Post } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";

@Controller("logistic")
export class LogisticController {

  constructor(private readonly httpService: HttpService) {
  }

  @Post("query")
  query(@Body("question") question: string) {
    // axios.post()
    return this.httpService.post("http://10.12.167.114:5000/input", {
      question
    });
    // return { data: "hello world" };
  }

}
