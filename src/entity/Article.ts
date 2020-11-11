import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity({name: "articles"})
export class Article {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    title: string;

    @Column()
    imageUrl: string;

    @Column()
    description: string;

}
