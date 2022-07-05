import { Camera } from "~/camera";
import PLAYER_SHADOW_IMAGE from "./images/floatingShadow.bmp";
import PLAYER_IMAGE from "./images/playerProtoHair.bmp";
import PLAYER_TRASH_CAN_IMAGE from "./images/trashCan.bmp";
import PLAYER_DEAD_BURN_MARK_IMAGE from "./images/burnMark.bmp";
import PLAYER_KNOCKED_OUT_IMAGE from "./images/playerProto_Knockout.bmp";
import PLAYER_CIGARETTE_GLOW_IMAGE from "./images/cigaretteGlow.bmp";


export class Player {
  static ACCELERATION: number = 1;
  static DECELERATION: number = 1;
  static MAX_SPEED: number = 7;
  dx: number = 0;
  dy: number = 0;
  isUp: boolean = false;
  isDown: boolean = false;
  isLeft: boolean = false;
  isRight: boolean = false;
  jumpHeight: number = 0;
  alreadyJumped: boolean = false;
  jumpCoolDown: number = 0;
  health: number = 1;
  pushDownFakeY: number = 0;
  playerWallet: number = 100;
  isJumping: boolean = false;
  isPlayerDead: boolean = false;
  isPlayerKnockedOut: boolean = false;
  playerKnockoutTime: number = 500;
  playerShadowImage: HTMLImageElement = new Image();
  playerImage: HTMLImageElement = new Image();
  playerKnockedOutImage: HTMLImageElement = new Image();
  playerTrashCanImage: HTMLImageElement = new Image();
  playerDeadBurnMarkImage: HTMLImageElement = new Image();
  playerCigaretteGlow: HTMLImageElement = new Image();
  playerCigaretteGlowOpacity: number = 0.5;
  x: number;
  private camera: any;
  private walkWaddle: number;
  private walkWaddleFlip: boolean;
  y: number;

  constructor(x: number, y: number, camera: Camera) {
    this.x = x || 0;
    this.y = y || 0;

    this.camera = camera;

    this.walkWaddle = 0;
    this.walkWaddleFlip = false;

    this.playerShadowImage.src = PLAYER_SHADOW_IMAGE;
    this.playerImage.src = PLAYER_IMAGE;
    this.playerTrashCanImage.src = PLAYER_TRASH_CAN_IMAGE;
    this.playerDeadBurnMarkImage.src = PLAYER_DEAD_BURN_MARK_IMAGE;
    this.playerKnockedOutImage.src = PLAYER_KNOCKED_OUT_IMAGE;
    this.playerCigaretteGlow.src = PLAYER_CIGARETTE_GLOW_IMAGE;
  }

  walletLogic(): void {
    if (this.playerWallet <= 0) {
      this.playerWallet = 0;
    }
  }

  update(): void {
    if (this.isUp || this.isDown || this.isLeft || this.isRight) {
      if (this.walkWaddle < 20 && this.walkWaddleFlip) {
        this.walkWaddle += 5;
      } else {
        this.walkWaddleFlip = false;
      }

      if (this.walkWaddle > -20 && !this.walkWaddleFlip) {
        this.walkWaddle -= 5;
      } else {
        this.walkWaddleFlip = true;
      }
    }

    this.walletLogic();
    this.knockOutPlayer();
    if (!this.isPlayerKnockedOut) {
      this.accelerate();
    }

    this.playerJump();

    this.x += this.dx;
    this.y += this.dy;
  }

  accelerate(): void {
    if (this.isUp) {
      this.dy -= Player.ACCELERATION;

      if (this.dy < -Player.MAX_SPEED) {
        this.dy = -Player.MAX_SPEED;
      }
    } else if (this.dy < 0) {
      this.dy += Player.DECELERATION;

      if (this.dy > 0) {
        this.dy = 0;
      }
    }

    if (this.isDown) {
      this.dy += Player.ACCELERATION;

      if (this.dy > Player.MAX_SPEED) {
        this.dy = Player.MAX_SPEED;
      }
    } else if (this.dy > 0) {
      this.dy -= Player.DECELERATION;

      if (this.dy < 0) {
        this.dy = 0;
      }
    }

    if (this.isLeft) {
      this.dx -= Player.ACCELERATION;

      if (this.dx < -Player.MAX_SPEED) {
        this.dx = -Player.MAX_SPEED;
      }
    } else if (this.dx < 0) {
      this.dx += Player.DECELERATION;

      if (this.dx > 0) {
        this.dx = 0;
      }
    }

    if (this.isRight) {
      this.dx += Player.ACCELERATION;

      if (this.dx > Player.MAX_SPEED) {
        this.dx = Player.MAX_SPEED;
      }
    } else if (this.dx > 0) {
      this.dx -= Player.DECELERATION;

      if (this.dx < 0) {
        this.dx = 0;
      }
    }
  }

  knockOutPlayer(): void {
    if (this.playerKnockoutTime !== 500) {
      this.isPlayerKnockedOut = true;
      this.playerKnockoutTime += 1;
    } else if (this.playerKnockoutTime <= 500) {
      this.isPlayerKnockedOut = false;
    }
  }

  playerJump(): void {
    if (
      this.isJumping &&
      this.jumpHeight <= 20 &&
      !this.alreadyJumped &&
      this.jumpCoolDown === 0
    ) {
      if (this.isUp) {
        this.y -= 5;
      } else if (this.isDown) {
        this.y += 5;
      }

      if (this.isLeft) {
        this.x -= 5;
      } else if (this.isRight) {
        this.x += 5;
      }

      this.jumpHeight += 5;
    } else if (this.jumpHeight > 20 || this.alreadyJumped || !this.isJumping) {
      if (this.jumpHeight > 0) {
        this.jumpHeight -= 2;
        this.alreadyJumped = true;
        this.jumpCoolDown = 3;
      } else if (this.jumpHeight <= 0) {
        this.jumpHeight = 0;
        this.alreadyJumped = false;
        this.jumpCoolDown -= 0.6;
        if (this.jumpCoolDown <= 0) {
          this.jumpCoolDown = 0;
        }
      }
    }
  }

  render(context: CanvasRenderingContext2D) {
    if (this.isPlayerDead || this.health <= 0) {
      context.drawImage(
        this.playerDeadBurnMarkImage,
        this.x - 500 - this.camera.x,
        this.y - this.camera.y
      );
    } else if (this.isPlayerKnockedOut) {
      context.drawImage(
        this.playerKnockedOutImage,
        this.x - this.camera.x,
        this.y - this.jumpHeight - this.camera.y
      );
    } else {
      context.drawImage(
        this.playerShadowImage,
        this.x - 10 - this.camera.x,
        this.y + 50 - this.pushDownFakeY - this.camera.y
      );

      context.drawImage(
        this.playerImage,
        this.x - this.camera.x,
        this.y - 20 - this.pushDownFakeY - this.jumpHeight - this.camera.y
      );

      context.globalAlpha = this.playerCigaretteGlowOpacity;
      context.drawImage(
        this.playerCigaretteGlow,
        this.x - 6 - this.camera.x,
        this.y + 18 - this.pushDownFakeY - this.jumpHeight - this.camera.y
      );
      context.globalAlpha = 1;
    }
  }
}
