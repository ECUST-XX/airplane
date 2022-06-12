
import { _decorator, Component, Node, instantiate, Prefab, Collider, ITriggerEvent, BoxCollider } from 'cc';
import { Bullet } from '../bullet/Bullet';
import { Constant } from '../framework/Constant';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = EmelyPlane
 * DateTime = Sat May 07 2022 18:00:27 GMT+0800 (中国标准时间)
 * Author = xx_learn_game
 * FileBasename = EmelyPlane.ts
 * FileBasenameNoExtension = EmelyPlane
 * URL = db://assets/script/plane/EmelyPlane.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass('EnemyPlane')
export class EnemyPlane extends Component {

    bullet: Prefab = null;
    bulletSpeed: number = -1;
    bulletRoot: Node = null;
    speed: number = 0.3;
    shootTime = 0.3;

    private _currentShootTime = 0.3;

    start() {

    }

    update(deltaTime: number) {
        const pos = this.node.position;
        const moveLength = pos.z + this.speed;
        this.node.setPosition(pos.x, pos.y, moveLength);
        if (this._currentShootTime > this.shootTime) {
            this.createEnemyBullet();
            this._currentShootTime = 0;
        }
        this._currentShootTime += deltaTime;

        if (moveLength > 25) {
            this.node.destroy();
        }
    }

    createEnemyBullet() {
        const bullet = instantiate(this.bullet);
        bullet.setParent(this.bulletRoot);
        const pos = this.node.position;
        bullet.setPosition(pos.x, pos.y, pos.z + 4);
        const bulletComp = bullet.addComponent(Bullet);
        bulletComp.bulletSpeed = this.bulletSpeed;

        let colliderComp = bullet.addComponent(BoxCollider);
        colliderComp.setGroup(Constant.CollisionType.enemyBullet);
        colliderComp.setMask(Constant.CollisionType.selfPlane | Constant.CollisionType.selfBullet)
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
        if (collisionGroup === Constant.CollisionType.selfPlane) {
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
