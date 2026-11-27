import { AfterViewInit, ElementRef, Inject, Injector } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { BaseComponent } from "./base.component";
import { Injectable } from "@angular/core";
import { CommonService } from "../services/common.service";

@Injectable()
export class FormBaseComponent extends BaseComponent implements AfterViewInit {
 
  currentElementList: any[] = [];
  currentIndex: number = 0;
  observer: any;
  notificationMsg: string = "";
  notificationMsgWithParam: string = "";
  userlParams = new Map<string, any>();


  constructor(
    protected location: Location,
    protected commonService: CommonService,
  ) {
    super();
  }

  ngAfterViewInit(): void {
    this.commonService.focusFirstControl();
  }

  handleNavigation(): void {
    if (this.location) {
      this.location.back();
    }
  }

  focusElement(tabIndex: any): void {
    setTimeout(() => {
      const element = document.querySelector(
        `[tabindex="${tabIndex}"]`,
      ) as HTMLElement;
      if (element) {
        element.focus();
      }
    }, 0);
  }

  protected fetchApprovalFlowTaskInstancePayload(): any {}

  protected getCurrentPath(): string {
    const fullPath = this.location.path();
    return fullPath.includes("?") ? fullPath.split("?")[0] : fullPath;
  }

  protected getQueryParamMapForApprovalFlow(
    verifier: string,
    taskId: number,
    detailsUI: string,
    correctionUI: string,
    responseType?: string,
  ): Map<string, any> {
    const params = new Map<string, any>();
    params.set("verifier", verifier != null ? verifier : null);
    params.set("taskId", taskId != null ? taskId : null);
    params.set("detailsUI", detailsUI != null ? detailsUI : null);
    params.set("correctionUI", correctionUI != null ? correctionUI : null);
    params.set("responseType", responseType != null ? responseType : null);
    return params;
  }

  isValidPattern(formName: string, controlName: string): boolean {
    const form = (this as any)[formName];
    const control = form?.get(controlName);

    return !!(
      control &&
      control.errors?.["pattern"] &&
      !control.errors?.["required"] &&
      (control.touched || control.dirty)
    );
  }

  isRequired(formName: string, controlName: string): boolean {
    const control = (this as any)[formName]?.get(controlName);
    return !!(
      control &&
      control.errors?.["required"] &&
      (control.touched || control.dirty || this.commonService.isSumbitted)
    );
  }

  isMinLength(formName: string, controlName: string): boolean {
    const control = (this as any)[formName]?.get(controlName);
    return !!(
      control &&
      control.errors?.["minlength"] &&
      (control.touched || control.dirty || this.commonService.isSumbitted)
    );
  }

  isMaxLength(formName: string, controlName: string): boolean {
    const control = (this as any)[formName]?.get(controlName);
    return !!(
      control &&
      control.errors?.["maxlength"] &&
      (control.touched || control.dirty || this.commonService.isSumbitted)
    );
  }

  isInvalid(formName: string, controlName: string): boolean {
    const control = (this as any)[formName]?.get(controlName);
    return !!(
      control &&
      control.invalid &&
      (control.touched || control.dirty || this.commonService.isSumbitted)
    );
  }

  isMaxValue(formName: string, controlName: string): boolean {
    const control = (this as any)[formName]?.get(controlName);
    return !!(
      control &&
      control.errors?.["max"] &&
      (control.touched || control.dirty || this.commonService.isSumbitted)
    );
  }

  isMinValue(formName: string, controlName: string): boolean {
    const control = (this as any)[formName]?.get(controlName);
    return !!(
      control &&
      control.errors?.["min"] &&
      (control.touched || control.dirty || this.commonService.isSumbitted)
    );
  }

  convertQueryParam(obj?: object): string {
    if (!obj) return "";
    return Object.entries(obj)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      )
      .join("&");
  }
}
