import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { User } from './src/typeorm/entities/user';
import { Role } from './src/typeorm/entities/role_type';
import { StatusType } from './src/typeorm/entities/status_type';
import { PostStatusType } from 'src/typeorm/entities/post_status_type';
import { Category } from 'src/typeorm/entities/category';
import { Posts } from 'src/typeorm/entities/post';
import { Comment } from 'src/typeorm/entities/comment';
import { Reaction } from 'src/typeorm/entities/reaction';
import { PostContent } from 'src/typeorm/entities/post_content';
import { Friend } from 'src/typeorm/entities/friend';
import { Share_Post } from 'src/typeorm/entities/share_post';

const OrmConfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'cuteness',
  entities: [
    User,
    StatusType,
    Role,
    PostStatusType,
    Category,
    Posts,
    Comment,
    Reaction,
    PostContent,
    Friend,
    Share_Post,
  ],
  synchronize: true,
};

export default OrmConfig;
