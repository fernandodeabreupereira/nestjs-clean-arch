import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder';
import { UserEntity, UserProps } from '../../user.entity';

describe('UserEntity unit tests', () => {
  let props: UserProps;
  let sut: UserEntity;

  beforeEach(() => {
    props = UserDataBuilder({});
    sut = new UserEntity(props);
  });

  it('should constructor method', () => {
    expect(sut.props.name).toEqual(props.name);
    expect(sut.props.email).toEqual(props.email);
    expect(sut.props.password).toEqual(props.password);
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });

  it('should test the name field getter', () => {
    expect(sut.name).toBeDefined();
    expect(sut.name).toEqual(props.name);
    expect(sut.props.name).toBeDefined();
    expect(sut.props.name).toEqual(props.name);
    expect(typeof sut.props.name).toBe('string');
  });

  it('should test the email field getter', () => {
    expect(sut.email).toBeDefined();
    expect(sut.email).toEqual(props.email);
    expect(sut.props.email).toBeDefined();
    expect(sut.props.email).toEqual(props.email);
    expect(typeof sut.props.email).toBe('string');
  });

  it('should test the password field getter', () => {
    expect(sut.password).toBeDefined();
    expect(sut.password).toEqual(props.password);
    expect(sut.props.password).toBeDefined();
    expect(sut.props.password).toEqual(props.password);
    expect(typeof sut.props.password).toBe('string');
  });

  it('should test the createdAt field getter', () => {
    expect(sut.createdAt).toBeDefined();
    expect(sut.props.createdAt).toBeDefined();
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });

  it('should test the name field setter', () => {
    const newName = "newName";
    sut['name'] = newName;

    expect(sut.props.name).toEqual(newName);
  });

  it('should test the password field setter', () => {
    const newPassword = "newPassword";
    sut['password'] = newPassword;

    expect(sut.props.password).toEqual(newPassword);
  });

  it('should test the update method', () => {
    expect(sut.props.name).toEqual(props.name);

    const newName = "newName";
    sut.update(newName);
    expect(sut.props.name).toEqual(newName);
  });

  it('should test the updatePassword method', () => {
    expect(sut.props.password).toEqual(props.password);

    const newPassword = "newPassword";
    sut.updatePassword(newPassword);
    expect(sut.props.password).toEqual(newPassword);
  });
});
