import { ApiProperty } from "@nestjs/swagger";
import { ITokenResponse } from "global-interfaces";

export class TokenResponse implements ITokenResponse {
    @ApiProperty()
    token: string;
}