import { isUUIDValidV4 } from "@/shared/utils/uuid";
import { faker } from '@faker-js/faker';
import { Entity } from "../../entity";

type StubProps = {
  prop1: string
  prop2: number
}

class StubEntity extends Entity<StubProps> { }

describe('Entity unit tests', () => {
  it('should throw an exception when an invalid UUID is provided as id', () => {
    const props = { prop1: 'value1', prop2: 15 };
    const invalidId = '123-c68b-4cfd-99dd-aac08024be8d';
    const createEntity = () => new StubEntity(props, invalidId);

    expect(createEntity).toThrowError('O ID fornecido não é um UUID v4 válido');
  });

  it('should set props and id', () => {
    const props = { prop1: 'value1', prop2: 15 };
    const entity = new StubEntity(props);

    expect(entity.props).toStrictEqual(props);
    expect(entity.id).not.toBeNull();
    expect(isUUIDValidV4(entity.id)).toBeTruthy();
  });

  it('should accept a valid uuid', () => {
    const props = { prop1: 'value1', prop2: 15 };
    const id = '698b0c7e-c68b-4cfd-99dd-aac08024be8d';
    const entity = new StubEntity(props, id);

    expect(isUUIDValidV4(entity.id)).toBeTruthy();
    expect(entity.id).toBe(id);
  })

  it('should convert a entity to a Javascript Object', () => {
    const props = { prop1: 'value1', prop2: 15 };
    const id = '698b0c7e-c68b-4cfd-99dd-aac08024be8d';
    const entity = new StubEntity(props, id);

    expect(entity.toJSON()).toStrictEqual({
      id,
      ...props,
    });
  })

  it('should validate passed id as a valid uuid', () => {
    const id = faker.string.uuid();

    const props: StubProps = {
      prop1: faker.string.alpha(),
      prop2: faker.number.int(),
    };

    const sut = new StubEntity(props, id);

    expect(isUUIDValidV4(sut.id)).toBeTruthy();
    expect(sut.id).toBe(id);
  });
});


