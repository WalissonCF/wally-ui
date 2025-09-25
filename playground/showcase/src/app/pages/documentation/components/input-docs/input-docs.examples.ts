// Input documentation code examples
export const InputCodeExamples = {
  // Installation
  installation: `npx wally-ui add input`,

  // Import examples
  import: `import { Input } from './components/wally-ui/input/input';`,
  componentImport: `@Component({
  selector: 'app-example',
  imports: [Input, ReactiveFormsModule],
  templateUrl: './example.html',
  styleUrl: './example.css'
})`,

  // Basic usage
  basicUsage: `<wally-input placeholder="Enter text"></wally-input>`,
  basicSetup: `placeholder: string = 'Enter your name';`,

  // FormGroup usage (most important!)
  formGroupTemplate: `<form [formGroup]="userForm" (ngSubmit)="onSubmit()">
  <wally-input
    formControlName="name"
    placeholder="Enter your name">
  </wally-input>

  <wally-input
    formControlName="email"
    placeholder="Enter your email">
  </wally-input>
</form>`,

  formGroupSetup: `import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

userForm: FormGroup;

constructor(private fb: FormBuilder) {
  this.userForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });
}

onSubmit() {
  if (this.userForm.valid) {
    console.log(this.userForm.value);
  }
}`,

  // States
  withValue: `<wally-input value="Pre-filled text" placeholder="Enter text"></wally-input>`,

  // Types
  emailType: `<wally-input type="email" placeholder="Enter your email"></wally-input>`,
  passwordType: `<wally-input type="password" placeholder="Enter password"></wally-input>`,

  // Form validation example
  validationTemplate: `<form [formGroup]="validationForm">
  <wally-input
    formControlName="username"
    placeholder="Username (required)">
  </wally-input>

  @if (validationForm.get('username')?.invalid && validationForm.get('username')?.touched) {
    <div>
      <span class="text-red-500 text-sm">Username is required</span>
    </div>
  }
</form>`,

  validationSetup: `validationForm = this.fb.group({
  username: ['', [Validators.required, Validators.minLength(3)]]
});`,

  // Properties
  propertyType: `type: string = 'text';`,
  propertyPlaceholder: `placeholder: string = '';`,
  propertyValue: `value: string = '';`
};