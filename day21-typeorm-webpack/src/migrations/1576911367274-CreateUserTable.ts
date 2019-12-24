import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateUserTable1576911367274 implements MigrationInterface {
    name = 'CreateUserTable1576911367274';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP TABLE `user`', undefined);
    }

}
