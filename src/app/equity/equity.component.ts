import { Component, OnInit, Inject } from '@angular/core';
import { InfuraService } from '../services/infura/infura.service';
import { AleqService } from '../services/aleq/aleq.service';
import { DataService } from '../services/data/data.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Web3Service } from '../services/metamask/web3.service';
import { MatSnackBar } from '@angular/material';


export interface DialogData {
  mintNumber: number;
  unmintNumber: number;
  totalSharesNumber: number;
  collateralRateNumber: number;
  claimPeriodNumber: number;
  ownerAddressHex: any;
}

@Component({
  selector: 'app-equity',
  templateUrl: './equity.component.html',
  styleUrls: ['./equity.component.scss'],
})

export class EquityComponent implements OnInit {
  public pauseStatus = false;
  public nameStatus = 'Loading';
  public symbolStatus = 'Loading';
  public totalSupplyStatus: number;
  public totalSharesStatus: number;
  public termsandconditions = 'Loading';
  public collateralRate: number;
  public preClaimPeriod: number;
  public claimPeriod: number;
  public contractAddress = 'Loading';
  public ownerAddress = 'Loading';
  public masterAddress = 'Loading';
  mintNumber: number;
  unmintNumber: number;
  totalSharesNumber: number;
  collateralRateNumber: number;
  claimPeriodNumber: number;
  ownerAddressHex: any;
  web3: any;
  txID: any;

  constructor(
    private infuraService: InfuraService,
    private aleqService: AleqService,
    private dataService: DataService,
    private web3Service: Web3Service,
    public dialog: MatDialog,
    private matSnackBar: MatSnackBar
    ) { }

  async ngOnInit() {
    await this.infuraService.bootstrapWeb3();
    await this.aleqService.bootstrapALEQ();
    await this.web3Service.bootstrapWeb3();

    this.dataService.pauseStatusObservable.subscribe((newPauseStatus) => {
      this.pauseStatus = newPauseStatus;
    });
    this.dataService.nameStatusObservable.subscribe((newNameStatus) => {
      this.nameStatus = newNameStatus;
    });
    this.dataService.symbolStatusObservable.subscribe((newSymbolStatus) => {
      this.symbolStatus = newSymbolStatus;
    });
    this.dataService.totalSupplyStatusObservable.subscribe((newTotalSupplyStatus) => {
      this.totalSupplyStatus = parseFloat(newTotalSupplyStatus);
    });
    this.dataService.totalSharesStatusObservable.subscribe((newTotalSharesStatus) => {
      this.totalSharesStatus = parseFloat(newTotalSharesStatus);
    });
    this.dataService.termsandconditionsObservable.subscribe((newTermsandConditions) => {
      this.termsandconditions = newTermsandConditions;
    });
    this.dataService.collateralRateObservable.subscribe((newCollateralRate) => {
      this.collateralRate = parseFloat(newCollateralRate);
    });
    this.dataService.preClaimPeriodObservable.subscribe((newPreClaimPeriod) => {
      this.preClaimPeriod = parseFloat(newPreClaimPeriod);
    });
    this.dataService.claimPeriodObservable.subscribe((newClaimPeriod) => {
      this.claimPeriod = parseFloat(newClaimPeriod);
    });
    this.dataService.contractAddressObservable.subscribe((newContractAddress) => {
      this.contractAddress = newContractAddress;
    });
    this.dataService.ownerAddressObservable.subscribe((newOwnerAddress) => {
      this.ownerAddress = newOwnerAddress;
    });
    this.dataService.masterAddressObservable.subscribe((newMasterAddress) => {
      this.masterAddress = newMasterAddress;
    });
  }
  openMintDialog() {
    const dialogRef = this.dialog.open(DialogMintingDialog, {
      width: '500px',
      data: {mintNumber: this.mintNumber}
    });
  }
  openUnmintDialog() {
    const dialogRef = this.dialog.open(DialogUnmintingDialog, {
      width: '500px',
      data: {unmintNumber: this.unmintNumber}
    });
  }
  openTotalSharesDialog() {
    const dialogRef = this.dialog.open(DialogTotalSharesDialog, {
      width: '500px',
      data: {totalSharesNumber: this.totalSharesNumber}
    });
  }
  openPausingDialog() {
    const dialogRef = this.dialog.open(DialogPausing, {
      width: '500px'
    });
  }
  openUnpausingDialog() {
    const dialogRef = this.dialog.open(DialogUnpausing, {
      width: '500px'
    });
  }
  openCollateralRateDialog() {
    const dialogRef = this.dialog.open(DialogCollateralRate, {
      width: '500px',
      data: {collateralRateNumber: this.collateralRateNumber}
    });
  }
  openClaimPeriodDialog() {
    const dialogRef = this.dialog.open(DialogClaimPeriod, {
      width: '500px',
      data: {claimPeriodNumber: this.claimPeriodNumber}
    });
  }
  openChangeOwnerDialog() {
    const dialogRef = this.dialog.open(DialogChangeOwner, {
      width: '500px',
      data: {ownerAddressHex: this.ownerAddressHex}
    });
  }
  openRenounceOwnershipDialog() {
    const dialogRef = this.dialog.open(DialogRenounceOwnership, {
      width: '500px'
    });
  }

  async onTest() {
    const network = await this.web3Service.web3.eth.net.getId();
    if (network === 4) {
    console.log(network);
    // this.txID = await this.aleqService.allowance(price, this.numberOfShares, this.selectedAccount);
    } else {
      this.matSnackBar.open('Please select the Rinkeby network in MetaMask.', null, { duration: 6000 });
    }
  }
}

@Component({
  selector: 'dialog-minting',
  templateUrl: 'dialog-minting.html',
  styleUrls: ['./dialog-minting.scss'],
})

export class DialogMintingDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogMintingDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  async changeClick() {
    this.dialogRef.close();
  }

  async noClick() {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-unminting',
  templateUrl: 'dialog-unminting.html',
  styleUrls: ['./dialog-unminting.scss'],
})

export class DialogUnmintingDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogUnmintingDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  async changeClick() {
    this.dialogRef.close();
  }

  async noClick() {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-total-shares',
  templateUrl: 'dialog-total-shares.html',
  styleUrls: ['./dialog-total-shares.scss'],
})

export class DialogTotalSharesDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogTotalSharesDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  async changeClick() {
    this.dialogRef.close();
  }

  async noClick() {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-pausing',
  templateUrl: 'dialog-pausing.html',
  styleUrls: ['./dialog-pausing.scss'],
})

export class DialogPausing {

  constructor(
    public dialogRef: MatDialogRef<DialogPausing>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  async changeClick(event) {
    this.dialogRef.close();
  }

  async noClick(event) {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-unpausing',
  templateUrl: 'dialog-unpausing.html',
  styleUrls: ['./dialog-unpausing.scss'],
})

export class DialogUnpausing {

  constructor(
    public dialogRef: MatDialogRef<DialogUnpausing>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  async changeClick() {
    this.dialogRef.close();
  }

  async noClick() {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-collateral-rate',
  templateUrl: 'dialog-collateral-rate.html',
  styleUrls: ['./dialog-collateral-rate.scss'],
})

export class DialogCollateralRate {

  constructor(
    public dialogRef: MatDialogRef<DialogCollateralRate>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  async changeClick() {
    this.dialogRef.close();
  }

  async noClick() {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-claim-period',
  templateUrl: 'dialog-claim-period.html',
  styleUrls: ['./dialog-claim-period.scss'],
})

export class DialogClaimPeriod {

  constructor(
    public dialogRef: MatDialogRef<DialogClaimPeriod>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  async changeClick() {
    this.dialogRef.close();
  }

  async noClick() {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-change-owner',
  templateUrl: 'dialog-change-owner.html',
  styleUrls: ['./dialog-change-owner.scss'],
})

export class DialogChangeOwner {

  constructor(
    public dialogRef: MatDialogRef<DialogChangeOwner>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  async changeClick() {
    this.dialogRef.close();
  }

  async noClick() {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-renounce-ownership',
  templateUrl: 'dialog-renounce-ownership.html',
  styleUrls: ['./dialog-renounce-ownership.scss'],
})

export class DialogRenounceOwnership {

  constructor(
    public dialogRef: MatDialogRef<DialogRenounceOwnership>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  async changeClick() {
    this.dialogRef.close();
  }

  async noClick() {
    this.dialogRef.close();
  }

}