package service;

import dto.UserRequestDto;
import model.User;

public interface UserService {
    User save(UserRequestDto requestDto);

    void update(User user);

    void delete(User user);
}
