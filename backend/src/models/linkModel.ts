import Sequelize, { Optional, Model } from 'sequelize';
import {Link} from './link';
import database from  '../database';

// Informando que o 'id' é um atributo opcional
interface ILinkCreationAttributes extends Optional<Link, "id">{}

// Amarrando as definições entre os objetos TypeScript (Entidade)
// E os do Banco de Dados (Modelo)
// Caso eu queria adicionar um atribudo no Modelo
// Que não tenha na Entidade, o TypeScript irá apresentar um erro de validação
export interface ILinkModel extends Model<Link, ILinkCreationAttributes>,Link {}

// Fazendo com que a tabela do banco siga as regrass do IlinkModel
const LinkModel = database.define<ILinkModel>('link', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    url: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    code: {
        type: Sequelize.STRING(20),
        unique: true,
        allowNull: false
    },
    hits: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
    }
})

export default LinkModel;