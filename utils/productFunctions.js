const moment = require('moment');

exports.getChildById = async (categories, selectedCats) => {
    let newCats = []
    categories.forEach(category => {
        category.children && category.children.forEach(item => {
            if (selectedCats.indexOf(item.code.toString()) !== -1 && item.children && item.children.length > 0) {
                newCats.push(item)
                item.children.forEach(n => {
                    selectedCats.push(n.code)
                })
            }
        })
    })
    if (newCats.length !== 0) await module.exports.getChildById(newCats, selectedCats)
}

exports.getChild = async (categories, cats) => {
    cats.forEach(cat => {
        cat.children = categories.filter(category => {
            return category.parent == cat.code
        }).map(category => {
            return {
                name: category.name,
                code: category.code,
                children: []
            }
        })
        // console.log(cats)
        if (cat.children && cat.children.length === 0) return
        module.exports.getChild(categories, cat.children)
    })
}

exports.getIndices = async (es, prefix, from = moment().subtract(1, 'months').format('DD.MM.YYYY'), to = moment().format('DD.MM.YYYY')) => {
    let indices = [];
    let diff = moment(to, 'DD.MM.YYYY').diff(moment(from, 'DD.MM.YYYY'), 'days')
    for (let i = 0; i < diff + 1; i++) {
        let tmp_indice = prefix + moment(from, 'DD.MM.YYYY').format('YYYY-MM-DD')
        let {body} = await es.indices.exists({
            index: tmp_indice
        })
        if (body) indices.push(tmp_indice)
        from = moment(from, 'DD.MM.YYYY').add(1, 'd')
    }
    return indices;
}