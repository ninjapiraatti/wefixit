<?php

  if (!count($options['pageStack'])) $session->redirect($home->url . "#" . $page->name);

?>

<?php

	$form = $modules->get("InputfieldForm");
	$form->action = "{$home->url}#contact";
	$form->id = "contact";
	setupFormMarkup($form);

	$formInput = $modules->get("InputfieldText");
  $formInput->name = "nimike";
  $formInput->label = "Nimi:";
  $formInput->required = true;
  $form->add($formInput);

  $formInput = $modules->get("InputfieldEmail");
  $formInput->name = "mailike";
  $formInput->label = "Sähköposti:";
  $formInput->required = true;
  $form->add($formInput);

  $formInput = $modules->get("InputfieldText");
  $formInput->name = "foonike";
  $formInput->label = "Puhelinnumero:";
  $form->add($formInput);

	$formInput = $modules->get("InputfieldTextarea");
  $formInput->name = "viestike";
  $formInput->label = "Viestisi: (Saat tarkemman hinta-arvion, kun kerrot laitteesi sarjanumeron/mallin.)";
  $formInput->required = true;
  $form->add($formInput);

	$formInput = $modules->get("InputfieldText");
  $formInput->name = "puh"; // As in Nalle Puh, not puhelin
  $formInput->label = "Älä välitä tästä kentästä:";
	$formInput->wrapClass = "dn";
  $form->add($formInput);

	$form->add([
		"type" => "submit",
		"name" => "submit",
		"value" => __("Lähetä"),
		"class" => "button button--large button--center"
	]);

	// If the form was submitted
	if ($input->post->submit) {
		// Make sure the required fields are filled and sanitized
		$form->processInput($input->post);

		// If there are no errors
		if (!$form->getErrors()) {
			// Success

			// If the honeypot is empty, send email
			if ($form->puh->value === "") {
				// Build subject
				$subject = "Uusi yhteydenotto";

				// Build message from template file
				$message = file_get_contents("{$config->paths->templates}email-contact.txt");
				$message = str_replace("{name}", $form->nimike->value, $message);
				$message = str_replace("{email}", $form->mailike->value, $message);
				$message = str_replace("{phone}", $form->foonike->value, $message);
				$message = str_replace("{message}", $form->viestike->value, $message);

				$mail = wireMail();
				$mail->to("{$home->email}")->ToName("{$home->title}");
				$mail->from("{$form->mailike->value}")->fromName("{$form->nimike->value}");
				$mail->subject($subject);
				$mail->body($message);
				$mail->send();
			}

			// Prevent duplicate submissions
			$session->CSRF->resetToken();

			// Redirect to thank you page
			$session->redirect($pages->get(1031)->httpUrl);
		} else {
			// Error
			$form->description = __("Korjaathan korostetut kentät.");
		}
	}

	// Make honeypot required to fool the bots
	$form->puh->required = true;

?>

<div class="grid grid--gutter mb2">
  <?=$form->render()?>
</div>
