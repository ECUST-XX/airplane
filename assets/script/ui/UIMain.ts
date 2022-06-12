
import { _decorator, Component, Node, systemEvent, SystemEvent, Touch, EventTouch } from 'cc';
import { GameManager } from '../framework/GameManager';
const { ccclass, property } = _decorator;

@ccclass('UIMain')
export class UIMain extends Component {

    @property
    public speed = 1;

    @property(Node)
    public playerPlane: Node = null;

    @property(GameManager)
    public gameManger: GameManager = null;

    start() {
        systemEvent.on(SystemEvent.EventType.TOUCH_START, this._touchStart, this);
        systemEvent.on(SystemEvent.EventType.TOUCH_END, this._touchEnd, this);
        systemEvent.on(SystemEvent.EventType.TOUCH_MOVE, this._touchMove, this);
    }

    _touchMove(touch: Touch, event: EventTouch) {
        const delta = touch.getDelta();
        let pos = this.playerPlane.position;
        this.playerPlane.setPosition(pos.x + 0.01 * this.speed * delta.x, pos.y, pos.z - 0.01 * this.speed * delta.y);

    }

    _touchStart(touch: Touch, event: EventTouch) {
        this.gameManger.setIsShooting(true)
    }

    _touchEnd(touch: Touch, event: EventTouch) {
        this.gameManger.setIsShooting(false)
    }

}

