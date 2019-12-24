import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateUserTable1577201437044 implements MigrationInterface {
    name = 'CreateUserTable1577201437044';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP TABLE `user`', undefined);
    }

}
