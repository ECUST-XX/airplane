
import { _decorator, Component, Node, systemEvent, SystemEvent, Touch, EventTouch, Prefab, instantiate, math } from 'cc';
import { Bullet } from '../bullet/Bullet';
import { Gift } from '../gift/Gift';
import { EnemyPlane } from '../plane/EnemyPlane';
import { SelfPlane } from '../plane/SelfPlane';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = GameManager
 * DateTime = Mon May 02 2022 20:05:20 GMT+0800 (中国标准时间)
 * Author = xx_learn_game
 * FileBasename = GameManager.ts
 * FileBasenameNoExtension = GameManager
 * URL = db://assets/GameManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass('GameManager')
export class GameManager extends Component {
    @property(Node)
    public playerPlane: Node = null;
    @property(Prefab)
    public bullet01: Prefab = null;
    @property(Prefab)
    public bullet02: Prefab = null;
    @property(Prefab)
    public bullet03: Prefab = null;
    @property(Prefab)
    public bullet04: Prefab = null;
    @property(Prefab)
    public bullet05: Prefab = null;

    @property
    public shootTime = 0.3;
    @property
    public bulletSpeed = 1;

    @property(Node)
    public bulletRoot: Node = null;

    @property([Prefab])
    enemyPlaneList: Prefab[] = [];
    @property([Prefab])
    enemyBulletList: Prefab[] = [];
    @property(Node)
    public enemyPlaneRoot: Node = null;

    @property([Prefab])
    giftList: Prefab[] = [];
    @property(Node)
    public giftRoot: Node = null;

    private _currentShootTime = 0;
    private _isShooting = false;

    start() {
        this._init();
    }

    private _init() {
        this._currentShootTime = this.shootTime;
        this.schedule(this.createEnemyPlane, 2);
        this.schedule(this.createGift, 5);
    }

    createGift(){
        let r = math.randomRangeInt(0, 3);
        let gift = this.giftList[r];
        let g =  instantiate(gift);
        g.setParent(this.giftRoot);
        g.setPosition(math.randomRangeInt(-11, 12), 0, -25);
        let gComp = g.addComponent(Gift);
        gComp.giftType = r;
    }

    createEnemyPlane() {
        let plane = this.enemyPlaneList[math.randomRangeInt(0, 2)];

        let br = math.randomRangeInt(0, 5);
        let p = instantiate(plane);
        p.setParent(this.enemyPlaneRoot);
        p.setPosition(math.randomRangeInt(-11, 12), 0, -25);
        let pComp = p.addComponent(EnemyPlane);
        pComp.bulletSpeed -= br*0.1;
        pComp.shootTime -= br*0.05;
        pComp.bullet = this.enemyBulletList[br];
        pComp.bulletRoot = this.bulletRoot;
        console.log(plane, pComp.bullet);
    }

    public setIsShooting(flag: boolean) {
        this._isShooting = flag;
    }

    update(deltaTime: number) {
        if (this._isShooting && this._currentShootTime > this.shootTime) {
            this.createPlayerBullet();
            this._currentShootTime = 0;
        }
        this._currentShootTime += deltaTime;
    }

    createPlayerBullet() {
        const bullet = instantiate(this.bullet01);
        bullet.setParent(this.bulletRoot);
        const pos = this.playerPlane.position;
        bullet.setPosition(pos.x, pos.y, pos.z - 4);
        const bulletComp = bullet.addComponent(Bullet);
        bulletComp.bulletSpeed = this.bulletSpeed;
        let sf = this.playerPlane.getComponent(SelfPlane);
        bulletComp.bulletType = sf.bulletType;
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
