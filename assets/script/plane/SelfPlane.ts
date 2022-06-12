
import { _decorator, Component, Node, systemEvent, SystemEvent, Touch, EventTouch, Collider, ITriggerEvent } from 'cc';
import { Constant } from '../framework/Constant';
import { Gift } from '../gift/Gift';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = SelfPlane
 * DateTime = Tue May 03 2022 18:47:20 GMT+0800 (中国标准时间)
 * Author = xx_learn_game
 * FileBasename = SelfPlane.ts
 * FileBasenameNoExtension = SelfPlane
 * URL = db://assets/script/SelfPlane.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass('SelfPlane')
export class SelfPlane extends Component {

    // @property
    // public speed = 1;

    bulletType = Constant.BulletType.bullet01;

    onEnable() {
        let collider = this.getComponent(Collider);
        collider.on('onTriggerEnter', this._onTriggerEnter, this)
    }

    onDisable() {
        let collider = this.getComponent(Collider);
        collider.off('onTriggerEnter', this._onTriggerEnter, this)
    }

    _onTriggerEnter(event: ITriggerEvent) {
        let collisionGroup = event.otherCollider.getGroup();
        if (collisionGroup === Constant.CollisionType.enemyPlane ||
            collisionGroup === Constant.CollisionType.enemyBullet) {
            console.log("die die die");
        } else if (collisionGroup === Constant.CollisionType.gift) {
            let g = event.otherCollider.getComponent(Gift);
            console.log("g.giftType", g.giftType);
            this.bulletType = g.giftType;
        }
    }


}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/zh/scripting/life-cycle-callbacks.html
 */
