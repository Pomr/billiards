
cc.Class({
    extends: cc.Component,

    properties: {
        shootPower:18,
    },

    // onLoad () {},

    start () {

    },
    shootCue(whitePosition){
        var vector=this.node.getPosition()
        var sub=vector.sub(whitePosition);
        var len=sub.mag();

        var cueHHalf=this.node.height*0.5;
        var centroidX=cueHHalf*this.shootPower*vector.x/len;    //质心
        var centroidY=cueHHalf*this.shootPower*vector.y/len;

        this.getComponent(cc.RigidBody).applyLinearImpulse(cc.v2(centroidX,centroidY),this.node.convertToWorldSpace(cc.v2(0,0),true))
    }

    // update (dt) {},
});
