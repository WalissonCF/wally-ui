import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Breadcrumb, BreadcrumbItem } from '../../../../components/breadcrumb/breadcrumb';
import { Input } from '../../../../components/input/input';
import { Button } from '../../../../components/button/button';

import { AiPromptService } from '../../../../core/services/ai-prompt.service';
import { InputCodeExamples } from './input-docs.examples';
import { getFormattedCode } from '../../../../core/utils/prism';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-input-docs',
  imports: [
    Input,
    Breadcrumb,
    Button,
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './input-docs.html',
  styleUrl: './input-docs.css'
})
export class InputDocs {
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', url: '/' },
    { label: 'Documentation', url: '/documentation' },
    { label: 'Components', url: '/documentation/components' },
    { label: 'Input' }
  ];

  // Form examples
  basicForm: FormGroup;
  validationForm: FormGroup;

  // Code examples with highlighting
  installationCode = getFormattedCode(InputCodeExamples.installation, 'bash');
  importCode = getFormattedCode(InputCodeExamples.import, 'typescript');
  componentImportCode = getFormattedCode(InputCodeExamples.componentImport, 'typescript');
  basicUsageCode = getFormattedCode(InputCodeExamples.basicUsage, 'html');
  basicSetupCode = getFormattedCode(InputCodeExamples.basicSetup, 'typescript');

  // FormGroup examples (highlighted!)
  formGroupTemplateCode = getFormattedCode(InputCodeExamples.formGroupTemplate, 'html');
  formGroupSetupCode = getFormattedCode(InputCodeExamples.formGroupSetup, 'typescript');

  // States
  withValueCode = getFormattedCode(InputCodeExamples.withValue, 'html');

  // Types
  emailTypeCode = getFormattedCode(InputCodeExamples.emailType, 'html');
  passwordTypeCode = getFormattedCode(InputCodeExamples.passwordType, 'html');

  // Validation
  validationTemplateCode = getFormattedCode(InputCodeExamples.validationTemplate, 'html');
  validationSetupCode = getFormattedCode(InputCodeExamples.validationSetup, 'typescript');

  // New Features
  labelCode = getFormattedCode(InputCodeExamples.withLabel, 'html');
  loadingCode = getFormattedCode(InputCodeExamples.loadingState, 'html');
  validCode = getFormattedCode(InputCodeExamples.validState, 'html');
  errorCode = getFormattedCode(InputCodeExamples.errorState, 'html');
  passwordCode = getFormattedCode(InputCodeExamples.passwordWithToggle, 'html');

  // Properties
  propertyLabelCode = getFormattedCode(InputCodeExamples.propertyLabel, 'typescript');
  propertyTypeCode = getFormattedCode(InputCodeExamples.propertyType, 'typescript');
  propertyPlaceholderCode = getFormattedCode(InputCodeExamples.propertyPlaceholder, 'typescript');
  propertyLoadingCode = getFormattedCode(InputCodeExamples.propertyLoading, 'typescript');
  propertyValidCode = getFormattedCode(InputCodeExamples.propertyValid, 'typescript');
  propertyErrorCode = getFormattedCode(InputCodeExamples.propertyError, 'typescript');

  constructor(
    private aiPromptService: AiPromptService,
    private fb: FormBuilder
  ) {
    this.basicForm = this.fb.group({
      name: [''],
      email: ['']
    });

    this.validationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  get claudeUrl(): string {
    return this.aiPromptService.generateClaudeUrl();
  }

  get chatGptUrl(): string {
    return this.aiPromptService.generateChatGptUrl();
  }

  onBasicSubmit() {
    console.log('Basic Form:', this.basicForm.value);
  }

  onValidationSubmit() {
    if (this.validationForm.valid) {
      console.log('Validation Form:', this.validationForm.value);
    }
  }
}