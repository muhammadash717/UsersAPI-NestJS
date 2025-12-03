import { Controller, Get, Post, Put, Delete, Param, Query, Body, NotFoundException, ParseIntPipe, ValidationPipe, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { UsersService } from './users.service';
import { RootGuard } from 'src/root/root.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    
    // GET /users?level=admin --> []
    @Get() // automatically asigned to "/users"
    getUsers(@Query('level') level: 'admin' | 'mid') {
        return this.usersService.getUsers(level);
    }

    // GET /users/:id --> { ... }
    @Get(':id') // asigned to "/users/<id>"
    getOneUser(@Param('id', ParseIntPipe) id: number) {
        try {
            return this.usersService.getUser(id)
        } catch (err) {
            throw new NotFoundException();
        }   
    }

    // POST /users
    @Post()
    @UseGuards(RootGuard)
    createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    // PUT /users/:id --> { ... }
    @Put(':id')
    updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.updateUser(+id, updateUserDto);
    }

    // DELETE /users/:id
    @Delete(':id')
    removeUser(@Param('id') id: string) {
        return this.usersService.removeUser(+id);
    }
}