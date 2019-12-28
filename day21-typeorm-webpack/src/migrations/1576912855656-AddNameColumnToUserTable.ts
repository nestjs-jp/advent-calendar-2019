import {MigrationInterface, QueryRunner} from 'typeorm';

export class AddNameColumnToUserTable1576912855656 implements MigrationInterface {
    name = 'AddNameColumnToUserTable1576912855656';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `user` ADD `name` varchar(255) NOT NULL', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `user` DROP COLUMN `name`', undefined);
    }

}
