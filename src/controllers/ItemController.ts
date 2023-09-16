import { Item } from "../models/Item";
let item: Item = new Item();

export class ItemController {
  async list(): Promise<Item[]> {
    return await Item.find({});
  }

  async create(
    nome: string,
    situacao: string,
    cidadeId: number
  ): Promise<Item> {
    item.nome = nome;
    item.situacao = situacao;
    item.categoria_id_categoria = cidadeId;

    await item.save();
    return item;
  }

  async edit(cd: Item, descricao: string, situacao: string): Promise<Item> {
    cd.nome = descricao;
    cd.situacao = situacao;
    await cd.save();
    return cd;
  }

  async delete(item: Item) {
    item.situacao = "I";
    await item.save();
  }
  async find(id: number): Promise<Item | null> {
    return await Item.findOneBy({ id_item: id });
  }
}
