<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use AppBundle\Repository\NoteRepository;
use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpFoundation\JsonResponse;
use AppBundle\Entity\Note;
use Symfony\Component\HttpFoundation\Request;

class NoteController extends Controller
{
	/**
	* @Route("/note", name="note_get_all")
	* @Method("GET")
	*/
	public function getAllAction()
	{
		$noteRepository = $this->getDoctrine()->getManager()->getRepository(Note::class);
		$notes = $noteRepository->findAll();

		$notesNorm = $this->get('serializer')->normalize($notes);

		return new JsonResponse($notesNorm);
	}

	/**
	* @Route("/note", name="note_add")
	* @Method("POST")
	*/
	public function addAction(Request $request)
	{
		$notesNorm = $this->get('serializer')->normalize($request->getContent());
		return $notesNorm;
		var_dump($request->getContent()); die();
	}
}