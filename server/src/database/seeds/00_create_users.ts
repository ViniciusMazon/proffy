import Knex from "knex";

export async function seed(knex: Knex) {
  await knex("users").insert([
    {
      name: 'Vinicius',
      surname: 'Mazon',
      email: 'vnpmazon@gmail.com',
      hash_password: '123456789',
      avatar: 'https://avatars3.githubusercontent.com/u/38103866?s=460&u=244951efa29035b28d90d168c50cd497cde3b9d5&v=4',
      whatsapp: '1199999999',
      bio: 'Estudante do curso de Bacharelado em Engenharia de Software. Apaixonado por empoderar usuários por meio de aplicações Web e Mobile utilizando as melhores techs',
    }
  ]);
}
