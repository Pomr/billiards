// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        console.log(this.getComponent(cc.Sprite));
        this.cue_inst = this.cue.getComponent("cue");

        this.node.on(cc.Node.EventType.TOUCH_START, function (e) {

        }.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
            var w_pos = e.getLocation();
            var dst = this.node.parent.convertToNodeSpaceAR(w_pos);
            var src = this.node.getPosition();
            var dir = dst.sub(src);    //方向
            var len = dir.mag();       //cc.pLength(dir); //长度dir向量的长度 摸    dir.mag();

            console.log("len:", len);

            if (len < this.min_dis) { 
                this.cue.active = false;
                return;
            }
            this.cue.active = true;
            //旋转角度
            var r = Math.atan2(dir.y, dir.x);
            var degree = r * 180 / Math.PI;       //弧度转度
            degree = 360 - degree + 180;     //数学函数逆时针旋转，ccc是顺时针旋转360-de。。。   图片头尾颠倒-180 

            this.cue.rotation = degree;

            var cue_pos = dst;
            var cue_len_half = this.cue.width * 0.5;
            cue_pos.x += (cue_len_half * dir.x / len);      //dir.x/len 算出当前的角度 cos值 求出下一个点的x坐标
            cue_pos.y += (cue_len_half * dir.y / len);

            this.cue.setPosition(cue_pos);

        }.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_END, function (e) {
            if (this.cue.active === false) {
                return;
            }
            // this.cue_inst.shoot_at(this.node.getPosition());
        }.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (e) {
            if (this.cue.active === false) {
                return;
            }
            // this.cue_inst.shoot_at(this.node.getPosition());
        }.bind(this), this);
    },

    // update (dt) {},
});
