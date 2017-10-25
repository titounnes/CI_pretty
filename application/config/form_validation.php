<?php defined('BASEPATH') OR exit('No direct script access allowed');

$config = [
    'user/password' => [
        [
            'field' => 'old_password',
            'label' => 'lang:old_password',
            'rules' => 'trim|required'
        ],
        [
            'field' => 'new_password',
            'label' => 'lang:new_password',
            'rules' => 'trim|required|min_length[6]|max_length[20]|matches[password_confirm]'
        ],
        [
            'field' => 'password_confirm',
            'label' => 'lang:password_confirm',
            'rules' => 'trim'
        ],
    ],
    'user/email' => [
        [
            'field' => 'email',
            'label' => 'lang:email',
            'rules' => 'trim|required|valid_email'
        ],
        [
            'field' => 'old_password',
            'label' => 'lang:password',
            'rules' => 'trim|required'
        ],
    ],
    'operator/course' => [
        [
        	'field' => 'title',
            'label' => 'lang:course',
            'rules' => 'trim|required|regex_match[/^[A-Za-z0-9 \.\-]+$/]',
        ],
        [
        	'field' => 'orde',
            'label' => 'lang:orde',
            'rules' => 'trim|required|regex_match[/^[0-9]+$/]',
        ],
    ],
    'operator/leader' => [
        [
            'field' =>'student_id',
            'label' => 'lang:leader',
            'rules' => 'trim|required',
        ] 
    ],
    'operator/mentor' => [
        [
            'field' =>'teacher_id',
            'label' => 'lang:mentor',
            'rules' => 'trim|required',
        ] 
    ],
    'operator/exschool' => [
        [
            'field' => 'code',
            'label' => 'lang:code',
            'rules' => 'trim|required|regex_match[/^[A-Za-z0-9 \-\/\_]+$/]',
        ],
        [
        	'field' => 'title',
            'label' => 'lang:exschool',
            'rules' => 'trim|required|regex_match[/^[A-Za-z0-9 \.\-]+$/]',
        ],
    ],
    'operator/classroom' => [
        [
            'field' => 'grade',
            'label' => 'lang:grade',
            'rules' => 'trim|required|regex_match[/^[0-3]$/]',
        ],
        [
            'field' => 'competence',
            'label' => 'lang:competence',
            'rules' => 'trim|required|regex_match[/^[1-9]$/]',
        ],
        [
        	'field' => 'code',
            'label' => 'lang:room',
            'rules' => 'trim|required|regex_match[/^[A-Za-z0-9 \.\-]+$/]',
        ],
        [
            'field' => 'title',
            'label' => 'lang:label_in_report',
            'rules' => 'trim|required|regex_match[/^[A-Za-z0-9 \.\-]+$/]',
        ],
    ],

    'operator/room' => [
        [
            'field' => 'teacher_id',
            'label' => 'lang:homeroom',
            'rules' => 'trim|required',
        ],
    ],
    'operator/import' => [
        [
            'field' => 'usernameColumn',
            'label' => 'lang:usernameColumn',
            'rules' => 'trim|required',
        ],
        [
            'field' => 'nameColumn',
            'label' => 'lang:nameColumn',
            'rules' => 'trim|required',
        ],
        [
            'field' => 'genderColumn',
            'label' => 'lang:genderColumn',
            'rules' => 'trim|required',
        ],
        [
            'field' => 'passwordColumn',
            'label' => 'lang:passwordColumn',
            'rules' => 'trim|required',
        ],
        
    ],
    'teacher/lesson' => [
        [
            'field' => 'competence_id',
            'label' => 'lang:topic',
            'rules' => 'trim|required|regex_match[/^[A-Za-z0-9 ()\.\-]+$/]',
        ],
    ],
    'teacher/competence' => [
        [
            'field' => 'code',
            'label' => 'lang:code',
            'rules' => 'trim|required',
        ],
        [
            'field' => 'semester',
            'label' => 'lang:semester',
            'rules' => 'required', 
        ],
        [
            'field' => 'topic',
            'label' => 'lang:topic',
            'rules' => 'trim|required'
        ],
        [
            'field' => 'competence',
            'label' => 'lang:competence',
            'rules' => 'trim|required',
        ],
    ],
    'teacher/projectSchedule' => [
        [
            'field' => 'submission',
            'label' => 'lang:submission',
            'rules' => 'required',
        ],
        [
            'field' => 'peer',
            'label' => 'lang:peer',
            'rules' => 'required', 
        ],
        [
            'field' => 'revision',
            'label' => 'lang:revision',
            'rules' => 'required'
        ],
        [
            'field' => 'finish',
            'label' => 'lang:finish',
            'rules' => 'required',
        ],
    ],
    'teacher/instrument' => [
        [
            'field' => 'aspect',
            'label' => 'lang:aspect',
            'rules' => 'required',
        ],
    ],
    'teacher/instrument_import' => [
        [
            'field' => 'instrument_id',
            'label' => 'lang:aspect',
            'rules' => 'required',
        ],
    ],
    'teacher/projectList' => [
        [
            'field' => 'title',
            'label' => 'lang:title',
            'rules' => 'trim|required|regex_match[/^[A-Za-z0-9 ()\.\-]+$/]',
        ],
    ],
    'teacher/performanceSchedule' => [
        [
            'field' => 'start',
            'label' => 'lang:start',
            'rules' => 'required',
        ],
        [
            'field' => 'finish',
            'label' => 'lang:finish',
            'rules' => 'required',
        ],
    ],
    'teacher/quizList' => [
        [
            'field' => 'quiz_type',
            'label' => 'lang:quiz_type',
            'rules' => 'required',
        ],
        [
            'field' => 'title',
            'label' => 'lang:title',
            'rules' => 'required',
        ],
        [
            'field' => 'token',
            'label' => 'lang:token',
            'rules' => 'required|min_length[6]',
        ],
    ],
    'teacher/quizItem' => [
        [
            'field' => 'answer',
            'label' => 'lang:answer',
            'rules' => 'required',
        ],
        [
            'field' => 'indicator',
            'label' => 'lang:indicator',
            'rules' => 'required',
        ],
    ],
    
];
