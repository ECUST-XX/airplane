
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Constant
 * DateTime = Sun May 08 2022 19:37:30 GMT+0800 (中国标准时间)
 * Author = xx_learn_game
 * FileBasename = Constant.ts
 * FileBasenameNoExtension = Constant
 * URL = db://assets/script/framework/Constant.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */


export class Constant {
    static CollisionType = {
        selfPlane: 1 << 1,
        enemyPlane: 1 << 2,
        selfBullet: 1 << 3,
        enemyBullet: 1 << 4,
        gift: 1 << 5,
    }

    static GiftType = {
        gift01: 0,
        gift02: 1,
        gift03: 2,
    }

    static BulletType = {
        bullet01: 0,
        bullet02: 1,
        bullet03: 2,
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
