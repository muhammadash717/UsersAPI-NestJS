import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';

@Injectable()
export class UsersService {
    private users = [
        { id: 0, name: 'user0', level: 'admin'},
        { id: 1, name: 'userA', level: 'mid'},
        { id: 2, name: 'userB', level: 'mid'},
    ];

    getUsers(level?: string) {
        if (level) {
            return this.users.filter((user) => user.level === level)
        }

        return this.users;
    }

    getUser(id: number) {
        const user = this.users.find((user) => user.id === id);

        if (!user) {
            throw new Error('user not found');
        }

        return user;
    }

    createUser(createUserDto: CreateUserDto) {
        const newUser = {
            ...createUserDto,
            id: Date.now(),
        };
        this.users.push(newUser);
        return newUser;
    }

    updateUser(id: number, updateUserDto: UpdateUserDto) {
        this.users = this.users.map((user) => {
            if (user.id === id) {
                const { id: _maybeId, ...dtoWithoutId } = updateUserDto as any;
                return { ...user, ...dtoWithoutId };
            }
            return user;
        });
        return this.getUser(id);
    }

    removeUser(id: number) {
        const toBeRemoved = this.getUser(id);

        this.users = this.users.filter((user) => user.id !== id);

        return toBeRemoved;
    }
}
