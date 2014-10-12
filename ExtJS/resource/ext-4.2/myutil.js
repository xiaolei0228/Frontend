/**
 * Created by haoxiaolei on 2014/10/6 0006.
 */
/**
 * 生成有层次关系的json数据
 * @param data 一个个的json数据
 * @returns {Array}
 */
function makeLevelData(data) {
    if (!data)
        return [];
    var _newData = []; //最终返回结果
    var _treeArray = {}; //记录一级节点
    var _root = 1; //最顶层fid
    var _idKey = "id"; //主键的键名
    var _fidKey = "pid"; //父ID的键名
    _getChildren(_root);
    function _getChildren($root) {
        var $children = [];
        for (var i in data) {
            if ($root == data[i][_fidKey]) {
                data[i]["children"] = _getChildren(data[i][_idKey]);
                $children.push(data[i]);
            }
            //只要一级节点
            if (_root == data[i][_fidKey] && !_treeArray[data[i][_idKey]]) {
                _treeArray[data[i][_idKey]] = data[i];
                _newData.push(data[i]);
            }
        }
        return $children;
    }

    return _newData;
}