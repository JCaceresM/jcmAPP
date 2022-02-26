import { CommonEntity } from '../../../../common/entity/common.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('user')
export class UserEntity extends CommonEntity {
  @Column({ name: 'username', type: 'text', nullable: false, unique: true })
  username: string;

  @Column({ name: 'password', type: 'text', nullable: false })
  password: string;

  @Column({ name: 'name', type: 'text', nullable: false })
  name: string;

  @Column({ name: 'last_name', type: 'text', nullable: false })
  lastName: string;

  @Column({ name: 'email', type: 'text', nullable: false })
  email: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    const saltOrRounds = 10;
    if (!this.password) {
      return;
    }
    this.password = await bcrypt.hash(this.password, saltOrRounds);
  }
  
  constructor(
    username: string,
    password: string,
    name: string,
    lastName: string,
    email: string,
    createAt: Date,
    updatedAt: Date,
    id: number,
  ) {
    super();
    (this.username = username),
      (this.password = password),
      (this.name = name),
      (this.lastName = lastName),
      (this.email = email),
      (this.createAt = createAt),
      (this.updatedAt = updatedAt);
    this.id = id;
  }
}
