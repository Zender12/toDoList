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
		$notes = $noteRepository->findBy([], ['id' => 'DESC']);

		$notesNorm = $this->get('serializer')->normalize($notes);

		return new JsonResponse($notesNorm);
	}

	/**
	* @Route("/note", name="note_add")
	* @Method("POST")
	*/
	public function addAction(Request $request)
	{
		$note = new Note();
		$newNote = json_decode($request->getContent());

		$note->setTitle($newNote->title);
		$note->setContent($newNote->content);

		$entityManager = $this->getDoctrine()->getManager();
		$entityManager->persist($note);
		$entityManager->flush();

		$notesNorm = $this->get('serializer')->normalize($note);
		return new JsonResponse($notesNorm);
	}

	/**
	* @Route("/note/{id}", name="note_delete")
	* @Method("DELETE")
	*/
	public function deleteAction(Note $note)
	{
		$entityManager = $this->getDoctrine()->getManager();

		$entityManager->remove($note);
		$entityManager->flush();
		
		$noteRepository = $this->getDoctrine()->getManager()->getRepository(Note::class);
		$notes = $noteRepository->findBy([], ['id' => 'DESC']);
		$notesNorm = $this->get('serializer')->normalize($notes);

		return new JsonResponse($notesNorm); 
	}
	/**
    * @Route("/note/{id}", name="note_edit")
    * @Method("PUT")
    */
    public function editAction(Request $request, Note $note)
    {
    	$newNote = json_decode($request->getContent());

		$note->setTitle($newNote->title);
		$note->setContent($newNote->content);

		$entityManager = $this->getDoctrine()->getManager();
		$entityManager->persist($note);
		$entityManager->flush();

    	return new JsonResponse([]); 
    }
}