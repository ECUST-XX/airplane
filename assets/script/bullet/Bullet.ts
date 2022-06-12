
import { _decorator, Component, Node, Collider, ITriggerEvent, math } from 'cc';
import { Constant } from '../framework/Constant';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Bullet
 * DateTime = Tue May 03 2022 20:13:28 GMT+0800 (中国标准时间)
 * Author = xx_learn_game
 * FileBasename = Bullet.ts
 * FileBasenameNoExtension = Bullet
 * URL = db://assets/script/bullet/Bullet.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

const OUTOFRANGE = 25;

@ccclass('Bullet')
export class Bullet extends Component {
    @property
    public bulletSpeed = 0;
    bulletType = Constant.BulletType.bullet01;

    start() {
        if (this.bulletSpeed === -1.4) {
            let q3 = new math.Vec3(0, -180, 0)
            this.node.setRotationFromEuler(q3)
        }
    }

    update(deltaTime: number) {
        const pos = this.node.position;
        const moveLength = pos.z - this.bulletSpeed;

        if (this.bulletType === Constant.BulletType.bullet02) {
            this.node.setPosition(pos.x + this.bulletSpeed * 0.2, pos.y, moveLength);
        } else {
            this.node.setPosition(pos.x, pos.y, moveLength);
        }

        if (-moveLength > OUTOFRANGE) {
            this.node.destroy();
        }
    }


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
        if (this.bulletSpeed > 0 && (collisionGroup === Constant.CollisionType.enemyPlane || collisionGroup === Constant.CollisionType.enemyBullet)) {
            this.node.destroy();
        } else if (this.bulletSpeed < 0 && (collisionGroup === Constant.CollisionType.selfBullet || collisionGroup === Constant.CollisionType.selfPlane)) {
            this.node.destroy();
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
