import linkModel, {ILinkModel} from './linkModel';
import {Link} from './link';

function findByCode(code: string) {
    return linkModel.findOne<ILinkModel>({ where: { code } });
}

function add(link: Link) {
    return linkModel.create<ILinkModel>(link);
}

async function hit(code: string) {
    const link = await findByCode(code);
    if(!link) return null;

    // Como o atributo 'hits' é opcional, preciso garantir ao TypeScript que ele sempre terá algum valor
    // Inserindo uma '!' após o atributo
    link.hits!++;
    await link.save();
    return link;
}

export default {
    findByCode,
    add,
    hit
}