import { isUUIDValidV4 } from '@/shared/utils/uuid';
import { randomUUID } from 'node:crypto';

type EntityJson<T> = { id: string } & T;

export abstract class Entity<Props = unknown> {
  private readonly _id: string;
  readonly props: Props;

  constructor (props: Props, id?: string) {
    if (id && !isUUIDValidV4(id)) {
      throw new Error('O ID fornecido não é um UUID v4 válido');
    }

    this._id = id ?? randomUUID();
    this.props = props;
  }

  get id (): string {
    return this._id;
  }

  toJSON (): Required<EntityJson<Props>> {
    return {
      id: this.id,
      ...this.props,
    } as Required<EntityJson<Props>>;
  }
}
