import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	public baseUrl:string ='http://localhost:9090';
	public userForm : any = {
	  fname : '',
	  lname : '',
	  role : '',
	  gender : {male: '',female:''},
	  email : '',
	  phone : '',
	  subject : ''
	};
	isFormSubmittedOnce: boolean = false;
	constructor(private http: HttpClient){ }

	ngOnInit() {
	}
	submitUserForm(){
		console.log(this.userForm,'#############')
		let obj = this.userForm;
		if(this.isFormSubmittedOnce){
			this.http.post<any>(`${this.baseUrl}/user/update`, obj).subscribe((res)=>{
				console.log('res from update',res)
				if(res && res.ops && res.ops.length && res.ops[0]){
					this.userForm = res.ops[0];
					if(res.msg){
						alert(res.msg);
					} else{
						alert('Form Updated');
					}
					this.isFormSubmittedOnce= true;
				}
			}); 
		} else{
			this.http.post<any>(`${this.baseUrl}/user/register`, obj).subscribe((res)=>{
				console.log('res from register',res)
				if(res && res.ops && res.ops.length && res.ops[0]){
					this.userForm = res.ops[0];
					if(res.msg){
						alert(res.msg);
					} else{
						alert('Form Submitted');
					}
					this.isFormSubmittedOnce= true;
				}
			}); 
		}
	}
	bindRadioValue(value){
		this.userForm.gender[value] = '';
	}
}
