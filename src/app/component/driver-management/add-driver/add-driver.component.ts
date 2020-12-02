import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, Observable, Subject,merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { FileService } from 'src/app/service/file.service';
import { LoginService } from 'src/app/service/login.service';
import { MasterDataService } from 'src/app/service/master-data.service';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.scss']
})
export class AddDriverComponent implements OnInit {

  // declare the child compoent
  @ViewChild('carcategoryinstance', {static: true}) carcategoryinstance: NgbTypeahead;
  carcategoryfocus$ = new Subject<string>();
  carcategoryclick$ = new Subject<string>();

  @ViewChild('carbrandinstance', {static: true}) carbrandinstance: NgbTypeahead;
  carbrandfocus$ = new Subject<string>();
  carbrandclick$ = new Subject<string>();

  @ViewChild('carmodelinstance', {static: true}) carmodelinstance: NgbTypeahead;
  carmodelfocus$ = new Subject<string>();
  carmodelclick$ = new Subject<string>();

  @ViewChild('carcolorinstance', {static: true}) carcolorinstance: NgbTypeahead;
  carcolorfocus$ = new Subject<string>();
  carcolorclick$ = new Subject<string>();

  @ViewChild('carinterriorinstance', {static: true}) carinterriorinstance: NgbTypeahead;
  carinterriorfocus$ = new Subject<string>();
  carinterriorclick$ = new Subject<string>();

  @ViewChild('vendorinstance', {static: true}) vendorinstance: NgbTypeahead;
  vendorfocus$ = new Subject<string>();
  vendorclick$ = new Subject<string>();

  // required variables
  loading;
  driverManagementForm: FormGroup;
  carCategoryArray;
  carCategoryList;
  carBrandArray;
  carBrandList;
  carModelArray;
  carModelList;
  carColorArray;
  carColorList;
  carInteriorArray;
  carInteriorList;
  vendorArray;
  vendorList;
  DocumentData:Array<any>;
  constructor(
    private formBuilder: FormBuilder,
    private loginService:LoginService,
    private masterData: MasterDataService,
    private fileService: FileService
  ) {  
    this.loading=false; 
    this.DocumentData=[];
  }

  ngOnInit(): void {
    let carCategoerySerach= this.masterData.getCarCategorySerach('');
    let carBrandSerach= this.masterData.getCarBrandSerach('');
    let carColorSerach= this.masterData.getCarColorSerach('');
    let carInteriorSerach= this.masterData.getCarInterriorSerach('');
    let vendorSerach= this.masterData.getCompanyDetails('');
    this.loading=true;
    forkJoin([
      carCategoerySerach,
      carBrandSerach,
      carColorSerach,
      carInteriorSerach,
      vendorSerach
    ])
    .subscribe(
      response=>{
        this.carCategoryArray= response[0].length>0 ? response[0].map(item=> item.name) :[] ;
        this.carCategoryList=response[0];
        this.carBrandArray=response[1].length>0 ? response[1].map(item=> item.name) :[] ;
        this.carBrandList=response[1];
        this.carColorArray=response[2].length>0 ? response[2].map(item=> item.name) :[] ;
        this.carColorList=response[2];
        this.carInteriorArray=response[3].length>0 ? response[3].map(item=> item.name) :[] ;
        this.carInteriorList=response[3];
        this.vendorArray= response[4].length>0 ? response[4].map(item=> item.companyName) :[] ;
        this.vendorList= response[4];
        this.loading=false;
      }
    )

    this.driverManagementForm= this.formBuilder.group({
      'firstName': new FormControl(),
      'lastName': new FormControl(),
      'mobileNumber': new FormControl(),
      'secMobileNumber': new FormControl(),
      'emailId': new FormControl(),
      'carDetailDto': this.formBuilder.group({
        'carCategory': new FormControl(),
        'type': new FormControl({value: '', disabled: true}),
        'subType': new FormControl(),
        'carColor': new FormControl(),
        'carInterrior': new FormControl(),
        'company': new FormControl()
      }),
      'registerNo': new FormControl(),
      'Driving Licence': this.formBuilder.group({
        'Front Image': new FormControl(),
        'Back Image': new FormControl(),
        'DL Number': new FormControl(),
        'Firt Name': new FormControl(),
        'Last Name': new FormControl(),
        'Blood Group': new FormControl(),
        'RTO Name': new FormControl(),
        'Issued Date': new FormControl(),
        'Date of Expiry': new FormControl(),
        'Type of Vehicle': new FormControl()
      }),
      'Pan Card': this.formBuilder.group({
        'Permanent  Account Number': new FormControl(),
        'PAN First Name': new FormControl(),
        'PAN Last Name': new FormControl(),
        "Father's Name": new FormControl(),
        'PAN DOB': new FormControl(),
        'Front Image': new FormControl(),
        'Back Image': new FormControl()
      }),
      'Adhar Card':this.formBuilder.group({
        'Aadhar Number': new FormControl(),
        'Aadhar Name': new FormControl(),
        'Aadhar Last Name': new FormControl(),
        'Aadhar Father Name': new FormControl(),
        'Aaddhar DOB': new FormControl(),
        'AadharAddress': new FormControl(),
        'Gender': new FormControl(),
        'Front Image': new FormControl(),
        'Back Image': new FormControl()
      }),
      'Police Verification': this.formBuilder.group({
        'Police Station Name': new FormControl(),
        'Document Number': new FormControl(),
        'Authority Name': new FormControl(),
        'Front Image': new FormControl(),
        'Back Image': new FormControl()
      }),
      'Vehicle Registration': this.formBuilder.group({
        'Registration Office': new FormControl(),
        'Gender': new FormControl(),
        'Back Image': new FormControl(),
        'Class': new FormControl(),
        'Reg Upto': new FormControl(),
        'Manufacturer Date': new FormControl(),
        'Tax Upto': new FormControl(),
        'Front Image': new FormControl(),
        'Age': new FormControl(),
        'regNumber': new FormControl(),
        'Manufacturer': new FormControl(),
        'Vehicle Color': new FormControl(),
        'Vehicle Model': new FormControl(),
        'Vehicle Base': new FormControl(),
        'Owner Name': new FormControl(),
        'FuelType': new FormControl(),
        'Registration Number': new FormControl(),
        'Registration Date': new FormControl()
      }),
      'Vehicle Insurance': this.formBuilder.group({
        'Insurance Type': new FormControl(),
        'Back Image': new FormControl(),
        'Document Number': new FormControl(),
        'Issued Date': new FormControl(),
        'Insurance Provider': new FormControl(),
        'Expiry Date': new FormControl(),
        'Front Image': new FormControl(),
        'Policy Number':new FormControl()
      }),
      'Vehicle Permit': this.formBuilder.group({
        'Permit Number': new FormControl(),
        'Back Image': new FormControl() ,
        'Issued Date': new FormControl(),
        'Permit Sate': new FormControl(),
        'Expiry Date': new FormControl(),
        'Front Image': new FormControl(),
        'Vehicle Number': new FormControl(),
        'Permit Type': new FormControl()
      }),
      'Road Tax': this.formBuilder.group({
        'Back Image': new FormControl(),
        'Document Number': new FormControl(),
        'Issued Date': new FormControl(),
        'Expiry Date': new FormControl(),
        'Front Image': new FormControl() 
      }),
      'Fittness Certificate': this.formBuilder.group({
        'Back Image': new FormControl(),
        'Document Number': new FormControl(),
        'Issued Date': new FormControl(),
        'Expiry Date': new FormControl(),
        'Front Image': new FormControl()
      })
    })
  this.driverManagementForm.get("carDetailDto.carCategory").valueChanges.subscribe(data=>{
      let carBrandData= this.carBrandList.length >0 && this.carBrandList.filter(item=> item.name=== data);
      if(carBrandData.length>0){
        this.loading=true;
        this.masterData.getCarSubTypeBrandSerach(carBrandData[0].id)
        .subscribe(
          response=>{
            this.carModelArray= response.length>0 ? response.map(item=> item.name) :[] ;
            this.carModelList=response;
            this.driverManagementForm.get("carDetailDto.type").enable();
            this.loading=false;
          },error=>{ this.loading=false; console.error("Error ",error);
          }
        )
      }
    })
  }

  carCategorySearchMethod = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.carcategoryclick$.pipe(filter(() => !this.carcategoryinstance.isPopupOpen()));
    const inputFocus$ = this.carcategoryfocus$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.carCategoryArray
        : this.carCategoryArray.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  carBrandSearchMethod = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.carbrandclick$.pipe(filter(() => !this.carbrandinstance.isPopupOpen()));
    const inputFocus$ = this.carbrandfocus$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.carBrandArray
        : this.carBrandArray.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  carModelSearchMethod = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.carmodelclick$.pipe(filter(() => !this.carmodelinstance.isPopupOpen()));
    const inputFocus$ = this.carmodelfocus$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.carModelArray
        : this.carModelArray.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  carColorSearchMethod = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.carcolorclick$.pipe(filter(() => !this.carcolorinstance.isPopupOpen()));
    const inputFocus$ = this.carcolorfocus$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.carColorArray
        : this.carColorArray.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  carInteriorSearchMethod = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.carinterriorclick$.pipe(filter(() => !this.carinterriorinstance.isPopupOpen()));
    const inputFocus$ = this.carinterriorfocus$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.carInteriorArray
        : this.carInteriorArray.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  vendorSearchMethod = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.vendorclick$.pipe(filter(() => !this.vendorinstance.isPopupOpen()));
    const inputFocus$ = this.vendorfocus$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.vendorArray
        : this.vendorArray.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  async Uploading(event,description, formControlName){
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      var reader = new FileReader();
      var fname = file.name.split(".");
      let contentTypeArray= file.type.split("/");
      let byteArray;
      reader.onload =async()=>{
        byteArray=reader.result.toString().split(",");
        let fileData={
          fileName:fname[0],
          content: byteArray[1],
          contentType: contentTypeArray[1],
          description
        }
        this.loading=true;
        await this.fileService.postFile([fileData])
        .subscribe(
          response=>{
            this.loading=false;
            this.driverManagementForm.get(formControlName).setValue(response[0]);
            this.loginService.successFullMessage("File is uploaded successfully...!");
          },error=>{ 
            this.loginService.errorMessage("Something went wrong file is not upload, Please try again...!");
            this.loading=false;
          }
        )
      };
      reader.onerror = function (error) { console.log('Error: ', error); };
      reader.readAsDataURL(file);
    }
  }

  // this method returning image path dl fornt
  get getDriverForntImagePath(){ return this.driverManagementForm.get('Driving Licence.Front Image').value; }

  // this method returning image path dl back
  get getDriverBackImagePath(){ return this.driverManagementForm.get('Driving Licence.Back Image').value; }

  // this method returning image path pan fornt
  get getPanCardForntImage(){ return this.driverManagementForm.get('Pan Card.Front Image').value; }

  // this method returning image path pan back
  get getPanCardBackImage(){ return this.driverManagementForm.get('Pan Card.Back Image').value; }

  // this method returning image path adhar fornt
  get getAdharCardForntImage(){ return this.driverManagementForm.get('Adhar Card.Front Image').value; }

  // this method returning image path adhar back
  get getAdharCardBackImage(){ return this.driverManagementForm.get('Adhar Card.Back Image').value; }

  // this method returning image path police station verification fornt
  get getPoliceVerificationForntImage(){ return this.driverManagementForm.get('Police Verification.Front Image').value; }

  // this method returning image path police station verification back
  get getPoliceVerificationBackImage(){ return this.driverManagementForm.get('Police Verification.Back Image').value; }

  // this method returning image path rc fornt
  get getRCForntImage(){ return this.driverManagementForm.get('Vehicle Registration.Front Image').value; }

  // this method returning image path rc back
  get getRCBackImage(){ return this.driverManagementForm.get('Vehicle Registration.Back Image').value; }

  // this method returning image path policy insurance fornt
  get getPolicyInsuranceForntImage(){ return this.driverManagementForm.get('Vehicle Insurance.Front Image').value; }

  // this method returning image path policy insurance back
  get getPolicyInsuranceBackImage(){ return this.driverManagementForm.get('Vehicle Insurance.Back Image').value; }

  // this method returning image path permit fornt
  get getPermitForntImage(){ return this.driverManagementForm.get('Vehicle Permit.Front Image').value;  }

  // this method returning image path permit back
  get getPermitBackImage(){ return this.driverManagementForm.get('Vehicle Permit.Back Image').value; }

  // this method returning image path road tax fornt
  get getRoadTaxForntImage(){ return this.driverManagementForm.get('Road Tax.Front Image').value; }

  // this method returning image path road tax back
  get getRoadTaxBackImage(){ return this.driverManagementForm.get('Road Tax.Back Image').value; }

  // this method returning image path fitness fornt
  get getFitnessForntImage() { return this.driverManagementForm.get('Fittness Certificate.Front Image').value; }

  // this method returning image path fitness back 
  get getFitnessBackImage(){ return this.driverManagementForm.get('Fittness Certificate.Back Image').value;}

  driverRegistration(){
    
    if(this.driverManagementForm.status== "VALID"){
      console.log("Data ", this.driverManagementForm)
      if(this.isFieldValid('Driving Licence.DL Number')){
        const { value,  } =this.driverManagementForm.get('Driving Licence')
        let documentField={
          ...value,
          'Issued Date':this.dateConvert(this.driverManagementForm.get('Driving Licence.Issued Date').value),
          'Date of Expiry':this.dateConvert(this.driverManagementForm.get('Driving Licence.Date of Expiry').value),
          "Date of Birth": '', 
        }
        let driverLicenceDocData={
          "documentType": { "id": 1 },
          "docName": "Driving Licence",
          "description": null,
          "active": true,
          "keyName": "DL Number:,Firt Name:,Last Name:,Date of Birth:,Blood Group:,RTO Name:,Issued Date:,Date of Expiry:,Type of Vehicle:,Remark:,Front Image:,Back Image:,",
          documentField
        }
        if(this.DocumentData.findIndex(item=> item.docName=="Driving Licence") < 0){
          this.DocumentData.push(driverLicenceDocData);
        }
      }
      if(this.isFieldValid('Pan Card.Permanent  Account Number')){
        const { value  } =this.driverManagementForm.get('Pan Card')
        let documentField={
          ...value,
          'PAN DOB':this.dateConvert(this.driverManagementForm.get('Pan Card.PAN DOB').value),
        }
        let panCardDocData={
          "documentType": { 'id': 3 },
          "docName": "Pan Card",
          "description": null,
          "active": true,
          "keyName": "Permanent  Account Number:,PAN First Name:,PAN Last Name:,Father's Name:,PAN DOB:,Front Image:,Back Image:,",
          documentField
        }
        if(this.DocumentData.findIndex(item=> item.docName=="Pan Card") < 0){
          this.DocumentData.push(panCardDocData)
        }
      }
      if(this.isFieldValid('Adhar Card.Aadhar Number')){
        const { value  } =this.driverManagementForm.get('Adhar Card')
        let documentField={
          ...value,
          'Aaddhar DOB':this.dateConvert(this.driverManagementForm.get('Adhar Card.Aaddhar DOB').value),
        }
        let adharCardDocData={
          "documentType": { 'id': 2 },
          "docName": "Adhar Card",
          "description": null,
          "active": true,
          "keyName": "Aadhar Number:,Aadhar Name:,Aadhar Last Name:,Aaddhar DOB:,Gender:,AadharAddress,Front Image:,Back Image:,",
          documentField
        }
        if(this.DocumentData.findIndex(item=> item.docName=="Adhar Card") < 0){
          this.DocumentData.push(adharCardDocData)
        }
      }
      if(this.isFieldValid('Police Verification.Police Station Name')){
        const { value  } =this.driverManagementForm.get('Police Verification')
        let policeVerificationDocData={
          "documentType": { 'id': 4 },
          "docName": "Police Verification",
          "description": null,
          "active": true,
          "keyName": "Police Station Name:,Authority Name:,Document Number:,Front Image:,Back Image:,",
          "documentField":value
        }
        if(this.DocumentData.findIndex(item=> item.docName=="Police Verification") < 0){
          this.DocumentData.push(policeVerificationDocData)
        }
      }
      if(this.isFieldValid('Vehicle Registration.Registration Number')){
        const { value  } =this.driverManagementForm.get('Vehicle Registration')
        let documentField={
          ...value,
          'Registration Date':this.dateConvert(this.driverManagementForm.get('Vehicle Registration.Registration Date').value),
          'Manufacturer Date':this.dateConvert(this.driverManagementForm.get('Vehicle Registration.Manufacturer Date').value)
        }
        let vehicalRegistrationDocData={
          "documentType": { 'id': 5 },
          "docName": "Vehicle Registration",
          "description": null,
          "active": true,
          "keyName": "Registration Number:,Registration Date:,Registration Office:,Owner Name:,Gender:,Age:,Manufacturer:,Vehicle Model:,Vehicle Base:,Manufacturer Date:,FuelType:,Reg Upto:,Tax Upto:,Class:,Vehicle Color:,Front Image:,Back Image:,",
          documentField
        }
        if(this.DocumentData.findIndex(item=> item.docName=="Vehicle Registration") < 0){
          this.DocumentData.push(vehicalRegistrationDocData)
        }
      }
      if(this.isFieldValid('Vehicle Insurance.Policy Number')){
        const { value  } =this.driverManagementForm.get('Vehicle Insurance')
        let documentField={
          ...value,
          'Issued Date':this.dateConvert(this.driverManagementForm.get('Vehicle Insurance.Issued Date').value),
          'Expiry Date':this.dateConvert(this.driverManagementForm.get('Vehicle Insurance.Expiry Date').value),
        }
        let vahicalInsuranceDocData={
          "documentType": { 'id': 6 },
          "docName": "Vehicle Insurance",
          "description": null,
          "active": true,
          "keyName": "Policy Number:,Issued Date:,Expiry Date:,Insurance Provider:,Document Number:,Insurance Type:,Front Image:,Back Image:,",
          documentField      
        }
        if(this.DocumentData.findIndex(item=> item.docName=="Vehicle Insurance") < 0){
          this.DocumentData.push(vahicalInsuranceDocData)
        }
      }
      if(this.isFieldValid('Vehicle Permit.Permit Number')){
        const { value  } =this.driverManagementForm.get('Vehicle Permit')
        let documentField={
          ...value,
          'Issued Date':this.dateConvert(this.driverManagementForm.get('Vehicle Permit.Issued Date').value),
          'Expiry Date':this.dateConvert(this.driverManagementForm.get('Vehicle Permit.Expiry Date').value),
        }
        let vehiclePermitDocData={
          "documentType": { 'id': 7 },
          "docName": "Vehicle Permit",
          "description": null,
          "active": true,
          "keyName": "Permit Number:,Issued Date:,Expiry Date:,Permit Sate:,Permit Type:,Vehicle Number:,Front Image:,Back Image:,",
          documentField
        }
        if(this.DocumentData.findIndex(item=> item.docName=="Vehicle Permit") < 0){
          this.DocumentData.push(vehiclePermitDocData)
        }
      }
      if(this.isFieldValid('Road Tax.Document Number')){
        const { value  } =this.driverManagementForm.get('Road Tax')
        let documentField={
          ...value,
          'Issued Date':this.dateConvert(this.driverManagementForm.get('Road Tax.Issued Date').value),
          'Expiry Date':this.dateConvert(this.driverManagementForm.get('Road Tax.Expiry Date').value),
        }
        let roadTaxDocData={
          "documentType": { 'id': 9 },
          "docName": "Road Tax",
          "description": null,
          "active": true,
          "keyName": "Document Number:,Issued Date:,Expiry Date:,Front Image:,Back Image:,",
          documentField      
        }
        if(this.DocumentData.findIndex(item=> item.docName=="Road Tax") < 0){
          this.DocumentData.push(roadTaxDocData)
        }
      }
      if(this.isFieldValid('Fittness Certificate.Document Number')){
        const { value  } =this.driverManagementForm.get('Fittness Certificate')
        let documentField={
          ...value,
          'Issued Date':this.dateConvert(this.driverManagementForm.get('Fittness Certificate.Issued Date').value),
          'Expiry Date':this.dateConvert(this.driverManagementForm.get('Fittness Certificate.Expiry Date').value),
        }
        let fitnessCertificateDocData={
          "documentType": { 'id': 10 },
          "docName": "Fittness Certificate",
          "description": null,
          "active": true,
          "keyName": "Document Number:,Issued Date:,Expiry Date:,Front Image:,Back Image:,",
          documentField
        }
        if(this.DocumentData.findIndex(item=> item.docName=="Fittness Certificate") < 0){
          this.DocumentData.push(fitnessCertificateDocData);
        }
      }
      console.log("Document Data ", this.DocumentData)
    }
  }

  dateConvert(dateValue){
    const { year, month,day}= dateValue
    return year+"-"+month+"-"+day;
  }

  // this method will checking filed is actived or not
  isFieldValid(field: string) {
    return this.driverManagementForm.get(field).value !=null && this.driverManagementForm.get(field).touched;
  }
  

}
