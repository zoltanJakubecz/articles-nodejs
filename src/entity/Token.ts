import { Column, Entity, PrimaryColumn } from "typeorm";

export enum Platform {
    ANDROID = "android",
    IOS = "ios",
    WEB = "web"
}

@Entity({name: "tokens"})
export class Token {
    
    @PrimaryColumn("uuid")
    token: number;

    @Column()
    platform: Platform;

    @Column()
    remaining: number;

}