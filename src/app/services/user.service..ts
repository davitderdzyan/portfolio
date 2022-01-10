import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {User} from "../models/User";
import {map, Observable} from 'rxjs';

@Injectable()
export class UserService{
  constructor(private http:HttpClient) {}

  getUsers(): Observable<User[]>{
    return this.http.get("/assets/data/Users.json").pipe(
      map((info: { data: User[] }) => {
          return info['data'].map(user => {
              return new User(user['UserID'], user['name']?.[3])
            }
          )
        }
      ))
  }
}
