cc.Class({
    extends: cc.Component,

    properties: {
        cue: cc.Node,
        minLen:20,
    },

    // onLoad () {},

    start() {
        var cueJs=this.cue.getComponent("cue");
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
            var touchW = e.getLocation();
            var touchN = this.node.parent.convertToNodeSpaceAR(touchW);
            var selfPosition = this.node.getPosition()
            var vector = selfPosition.sub(touchN);
            var len = vector.mag();
            if(len<=this.minLen){
                this.cue.active=false;
                return;
            }
            this.cue.active=true;
            //角度
            var rad = Math.atan2(vector.y, vector.x);
            var angle = rad * 180 / Math.PI;
            console.log(angle)
            this.cue.rotation = 360-angle;
            //位置
            var cueX=


            this.cue.setPosition(touchN);
        }.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_END,function(){
            if(this.cue.active==false){
                return;
            }
            cueJs.shootCue(this.node.getPosition());
        },this)
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,function(){
            if(this.cue.active==false){
                return;
            }
            cueJs.shootCue(this.node.getPosition());
        },this)
    },

    // update (dt) {},
});
