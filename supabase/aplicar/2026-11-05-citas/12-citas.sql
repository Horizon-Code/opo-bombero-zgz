-- Lote 12: amplía la cita (texto literal que sigue en el bloque del corpus) de 85 preguntas.
-- Guardas: solo si la cita actual acaba exactamente como la que se amplió, y no está editada a mano.
with u as (
  update public.banco_preguntas b set cita = b.cita || v.ext, editada_at = now()
  from (values
('C085-0294','SISTENCIA MÉDICO-FARMACÉUTICA;',' y SEGURO DE RESPONSABILIDAD CIVIL para los daños y perjuicios que pueda causar un componente en sus actuaciones.'),
('C085-0303','CIAR EL EXPEDIENTE de sanción;',' igual para las acciones recompensables.'),
('C085-0313','EL TRÁFICO en zonas asignadas;',' CONTROLAR ACCESOS; ACORDONAR ZONAS.'),
('C085-0322','ÚBLICOS a que sean requeridos;',' USO OBLIGATORIO en INTERVENCIÓN ESPECIAL, SINIESTROS O CALAMIDADES, a efectos de PROTECCIÓN E IDENTIFICACIÓN.'),
('C085-0323',' MAL TRATO O FALTA DE CUIDADO;',' en caso de baja, ENTREGA de todos los efectos.'),
('C085-0334','SISTENCIA MÉDICO-FARMACÉUTICA;',' y SEGURO DE RESPONSABILIDAD CIVIL para los daños y perjuicios que pueda causar un componente en sus actuaciones.'),
('C085-0338','ORMACIÓN BÁSICA de aspirantes;',' CURSOS DE PERFECCIONAMIENTO para voluntarios; y EJERCICIOS PRÁCTICOS PERIÓDICOS.'),
('C086-0004','aborales está constituida por:','
1. LA PRESENTE LEY.
2. SUS DISPOSICIONES DE DESARROLLO O COMPLEMENTARIAS.
3. CUANTAS OTRAS NORMAS, LEGALES O CONVENCIONALES, contengan prescripciones relativas a la adopción de medidas preventivas en el ámbito laboral o SUSCEPTIBLES DE PRODUCIRLAS en dicho ámbito.'),
('C086-0020',' de las funciones públicas de:','
- POLICÍA, SEGURIDAD Y RESGUARDO ADUANERO;
- SERVICIOS OPERATIVOS DE PROTECCIÓN CIVIL Y PERITAJE FORENSE EN LOS CASOS DE GRAVE RIESGO, CATÁSTROFE Y CALAMIDAD PÚBLICA;
- FUERZAS ARMADAS Y ACTIVIDADES MILITARES DE LA GUARDIA CIVIL.'),
('C086-0030','NCIPIOS GENERALES relativos a:','
- la prevención de los riesgos profesionales para la protección de la seguridad y de la salud,
- la eliminación o disminución de los riesgos derivados del trabajo,
- la INFORMACIÓN, la CONSULTA, la PARTICIPACIÓN EQUILIBRADA y la FORMACIÓN de los trabajadores en materia preventiva.'),
('C086-0031','las normas que la desarrollen:','
1.º PREVENCIÓN: el conjunto de actividades o medidas adoptadas o previstas EN TODAS LAS FASES DE ACTIVIDAD DE LA EMPRESA con el fin de EVITAR O DISMINUIR los riesgos derivados del trabajo.'),
('C086-0041','SGO LABORAL GRAVE E INMINENTE:',' aquel que resulte PROBABLE RACIONALMENTE que se materialice EN UN FUTURO INMEDIATO y pueda suponer un DAÑO GRAVE para la salud de los trabajadores.'),
('C086-0043','TOS POTENCIALMENTE PELIGROSOS:',' aquellos que, EN AUSENCIA DE MEDIDAS PREVENTIVAS ESPECÍFICAS, originen riesgos para la seguridad y la salud de los trabajadores que los desarrollan o utilizan.'),
('C086-0055','7.º CONDICIÓN DE TRABAJO:',' cualquier característica del mismo que pueda tener una INFLUENCIA SIGNIFICATIVA en la generación de riesgos para la seguridad y la salud del trabajador.'),
('C086-0056','dan ESPECÍFICAMENTE INCLUIDAS:','
a) Las características generales de los LOCALES, INSTALACIONES, EQUIPOS, PRODUCTOS Y DEMÁS ÚTILES existentes en el centro de trabajo.
b) La naturaleza de los AGENTES FÍSICOS, QUÍMICOS Y BIOLÓGICOS presentes en el ambiente de trabajo y sus correspondientes INTENSIDADES, CONCENTRACIONES O NIVELES DE PRESENCIA.
c) Los PROCEDIMIENTOS para la utilización de los agentes citados que influyan en la generación de los…'),
('C087-0033','INCIPIOS BÁSICOS DE ACTUACIÓN:','
a) RESPETO A LOS DERECHOS FUNDAMENTALES y a las libertades públicas, conforme a la Constitución, el Estatuto de Autonomía de Aragón y el resto del ordenamiento, tratando correctamente a aquellos a quienes deban auxiliar y proteger.
b) DILIGENCIA, CELERIDAD, EFICACIA Y DECISIÓN, para conseguir la máxima rapidez, según principios de PROPORCIONALIDAD, CONGRUENCIA Y OPORTUNIDAD.
c) APOYO Y AUXILIO a l'),
('C087-0053','egislación de comarcalización:','
a) Colaborar con las entidades que presten el Servicio y prestarlo, en su caso, en los supuestos de la legislación local.
b) Elaborar PROGRAMAS COMARCALES, promoviendo campañas de concienciación y sensibilización.
c) Promover la creación de ORGANIZACIONES DE VOLUNTARIOS en el territorio comarcal.'),
('C087-0087','e colaborar con los Servicios:','
a) Cumpliendo las MEDIDAS DE PREVENCIÓN Y PROTECCIÓN para personas, animales y bienes establecidas en las leyes.
b) Cumpliendo las PRESTACIONES DE CARÁCTER PERSONAL que la autoridad competente determine en los supuestos de GRAVE RIESGO, CATÁSTROFE O CALAMIDAD PÚBLICA. DICHAS PRESTACIONES NO DARÁN DERECHO A INDEMNIZACIÓN.'),
('C087-0101','rdinación serán ejercidas por:','
a) EL GOBIERNO DE ARAGÓN.
b) EL DEPARTAMENTO competente en materia de protección civil.
c) LA COMISIÓN DE COORDINACIÓN.
2. Podrán constituirse CUALESQUIERA OTROS con carácter ASESOR, DE PREPARACIÓN O EJECUCIÓN de los trabajos que les encomienden aquellos.'),
('C087-0106','ERNO DE ARAGÓN, «entre otras»:','
a) El DESARROLLO REGLAMENTARIO de esta ley en materia de estructura, organización y funcionamiento.
b) La regulación de sistemas de HOMOGENEIZACIÓN Y HOMOLOGACIÓN DE LA UNIFORMIDAD Y DE LA IMAGEN CORPORATIVA.
c) La HOMOGENEIZACIÓN DE LOS MEDIOS TÉCNICOS y recursos, en especial de los sistemas de INFORMACIÓN E INTERCOMUNICACIÓN.
d) La provisión de medios comunes de coordinación en gestión de emergencias mediante la…'),
('C087-0139','esional figurará, COMO MÍNIMO:','
- el NOMBRE DE LA ENTIDAD TITULAR,
- el DE LA PERSONA,
- SU CATEGORÍA,
- su NÚMERO DE IDENTIFICACIÓN PROFESIONAL.'),
('C087-0146','uno desarrollo reglamentario»:','
a) Impartir los CURSOS SELECTIVOS para los profesionales de los Servicios.
b) Impartir los cursos de formación PARA CADA UNA DE LAS ESPECIALIDADES.
c) FORMAR PERMANENTEMENTE al personal de los Servicios.
d) HABILITAR para el desempeño de funciones de VOLUNTARIO Y PERSONAL DE EMPRESA y, en su caso, impartir los correspondientes cursos.
e) CONVALIDAR los cursos que se impartan para el acceso a la condición de…'),
('C087-0200','LUNTARIO será beneficiario de:','
- un seguro que cubrirá la DEFENSA JURÍDICA y la RESPONSABILIDAD CIVIL derivada del cumplimiento de sus funciones;
   - un SEGURO DE ACCIDENTES EN ACTO DE SERVICIO que contemplará los casos de MUERTE, INVALIDEZ E INCAPACIDAD TEMPORAL.'),
('C087-0203','CON SUJECIÓN A LA LEGALIDAD, o','
- CUMPLIENDO ÓRDENES SUPERIORES QUE NO CONSTITUYAN UNA INFRACCIÓN MANIFIESTA, CLARA Y TERMINANTE DEL ORDENAMIENTO JURÍDICO.'),
('C087-0205','LUNTARIO será beneficiario de:','
- un seguro que cubrirá la DEFENSA JURÍDICA y la RESPONSABILIDAD CIVIL derivada del cumplimiento de sus funciones;
   - un SEGURO DE ACCIDENTES EN ACTO DE SERVICIO que contemplará los casos de MUERTE, INVALIDEZ E INCAPACIDAD TEMPORAL.'),
('C087-0206','ISTINCIONES Y CONDECORACIONES:','
- al personal de los Servicios,
- ASÍ COMO A LAS PERSONAS QUE SE DISTINGAN NOTORIAMENTE en el cumplimiento de sus funciones,
de acuerdo con el procedimiento y los requisitos que se establezcan REGLAMENTARIAMENTE.'),
('C087-0207','cumplimiento de sus funciones,','
de acuerdo con el procedimiento y los requisitos que se establezcan REGLAMENTARIAMENTE.'),
('C087-0225','siguientes (numeradas 1 a 12):','
1. NO ACUDIR A LAS LLAMADAS DE SINIESTRO ESTANDO DE SERVICIO.
2. Actuaciones en las que medie DOLO O IMPRUDENCIA TEMERARIA que, PRODUCIDAS EN SITUACIÓN DE EMERGENCIA, causen GRAVES DAÑOS a la Administración pública o a los administrados, tanto en las personas como en los bienes.
3. LA INSUBORDINACIÓN individual o colectiva a las autoridades o superiores de los que dependa, así como LA DESOBEDIENCI'),
('C087-0240','ación general, ocho supuestos:','
1. Los actos y conductas que ATENTEN CONTRA LA DIGNIDAD DEL PERSONAL, IMAGEN Y PRESTIGIO DEL SERVICIO.
2. La actuación con ABUSO DE ATRIBUCIONES, en perjuicio de los ciudadanos, SIEMPRE QUE EL HECHO NO CONSTITUYA UNA FALTA MUY GRAVE.
3. EL USO DEL UNIFORME O MATERIAL DEL SERVICIO EN SITUACIONES AJENAS A LA PRESTACIÓN DEL MISMO.
4. El incumplimiento de la obligación de MANTENERSE EN EL TURNO DE TRABAJO HASTA LA…'),
('C087-0252','ación general, ocho supuestos:','
1. Los actos y conductas que ATENTEN CONTRA LA DIGNIDAD DEL PERSONAL, IMAGEN Y PRESTIGIO DEL SERVICIO.
2. La actuación con ABUSO DE ATRIBUCIONES, en perjuicio de los ciudadanos, SIEMPRE QUE EL HECHO NO CONSTITUYA UNA FALTA MUY GRAVE.
3. EL USO DEL UNIFORME O MATERIAL DEL SERVICIO EN SITUACIONES AJENAS A LA PRESTACIÓN DEL MISMO.
4. El incumplimiento de la obligación de MANTENERSE EN EL TURNO DE TRABAJO HASTA LA…'),
('C087-0253','ación general, TRES supuestos:','
1. EL DESCUIDO INJUSTIFICADO EN LA PRESENTACIÓN PERSONAL.
2. NO PRESENTARSE AL CORRESPONDIENTE RELEVO DE TURNO DEBIDAMENTE UNIFORMADO, SIN CAUSA JUSTIFICADA.
3. EL INCUMPLIMIENTO DE CUALQUIERA DE LAS FUNCIONES BÁSICAS, CUANDO NO SEA CALIFICADO COMO FALTA GRAVE O MUY GRAVE.'),
('C087-0261','utónoma de Aragón, FIJANDO SU:','
- ORGANIZACIÓN,
- FUNCIONES,
- RECURSOS,
- MEDIOS DE FINANCIACIÓN.'),
('C087-0268','CORRESPONDE A LOS MUNICIPIOS:','
a) Los de población SUPERIOR A VEINTE MIL HABITANTES deberán prestar el servicio POR SÍ, ASOCIADOS O A TRAVÉS DE LAS DISTINTAS FORMAS DE GESTIÓN de los servicios públicos locales, sin perjuicio de poder solicitar la DISPENSA de su prestación en los términos de la legislación de régimen local.
b) Aprobar las ORDENANZAS que garanticen un adecuado nivel de protección frente al riesgo de siniestros en la…'),
('C087-0269','ESPONDE AL GOBIERNO DE ARAGÓN:','
a) PROMOVER LA CONSTITUCIÓN de una organización para los municipios de MENOS de veinte mil habitantes que no lo presten, sin perjuicio de su autonomía local.
b) DETERMINAR LOS CRITERIOS para la organización territorial y REGULAR su estructura, funcionamiento y organización.
c) COORDINAR los Servicios locales, garantizando la cooperación y colaboración.'),
('C087-0289','ompetente en protección civil:','
a) Establecer las NORMAS-MARCO a las que habrán de ajustarse los REGLAMENTOS INTERNOS de organización y funcionamiento de los Servicios.
b) Fijar los CONTENIDOS MÍNIMOS de la formación profesional, perfeccionamiento y capacitación de su personal, de los voluntarios y del personal de empresa.
c) COORDINAR Y SUPERVISAR A LOS VOLUNTARIOS.
d) ASESORAR a los Servicios e instrumentar medidas de coordinación y…'),
('C087-0299','tegrada por representantes de:',' LA ADMINISTRACIÓN DE LA COMUNIDAD AUTÓNOMA DE ARAGÓN, LAS ENTIDADES LOCALES y LAS ORGANIZACIONES SINDICALES MÁS REPRESENTATIVAS.'),
('C087-0305',' NOMBRE DE LA ENTIDAD TITULAR,','
- el DE LA PERSONA,
- SU CATEGORÍA,
- su NÚMERO DE IDENTIFICACIÓN PROFESIONAL.'),
('C087-0325','SIEMPRE QUE HUBIEREN ACTUADO:','
- CON SUJECIÓN A LA LEGALIDAD, o
- CUMPLIENDO ÓRDENES SUPERIORES QUE NO CONSTITUYAN UNA INFRACCIÓN MANIFIESTA, CLARA Y TERMINANTE DEL ORDENAMIENTO JURÍDICO.'),
('C087-0329','será beneficiario de:','
- un seguro que cubrirá la DEFENSA JURÍDICA y la RESPONSABILIDAD CIVIL derivada del cumplimiento de sus funciones;
   - un SEGURO DE ACCIDENTES EN ACTO DE SERVICIO que contemplará los casos de MUERTE, INVALIDEZ E INCAPACIDAD TEMPORAL.'),
('C087-0330',' al personal de los Servicios,','
- ASÍ COMO A LAS PERSONAS QUE SE DISTINGAN NOTORIAMENTE en el cumplimiento de sus funciones,
de acuerdo con el procedimiento y los requisitos que se establezcan REGLAMENTARIAMENTE.'),
('C087-0350','ación general, TRES supuestos:','
1. EL DESCUIDO INJUSTIFICADO EN LA PRESENTACIÓN PERSONAL.
2. NO PRESENTARSE AL CORRESPONDIENTE RELEVO DE TURNO DEBIDAMENTE UNIFORMADO, SIN CAUSA JUSTIFICADA.
3. EL INCUMPLIMIENTO DE CUALQUIERA DE LAS FUNCIONES BÁSICAS, CUANDO NO SEA CALIFICADO COMO FALTA GRAVE O MUY GRAVE.'),
('C087-0379','ación general, ocho supuestos:','
1. Los actos y conductas que ATENTEN CONTRA LA DIGNIDAD DEL PERSONAL, IMAGEN Y PRESTIGIO DEL SERVICIO.
2. La actuación con ABUSO DE ATRIBUCIONES, en perjuicio de los ciudadanos, SIEMPRE QUE EL HECHO NO CONSTITUYA UNA FALTA MUY GRAVE.
3. EL USO DEL UNIFORME O MATERIAL DEL SERVICIO EN SITUACIONES AJENAS A LA PRESTACIÓN DEL MISMO.
4. El incumplimiento de la obligación de MANTENERSE EN EL TURNO DE TRABAJO HASTA LA…'),
('C088-0003','drán imponerse las siguientes:','
a) SEPARACIÓN DEL SERVICIO DE LOS FUNCIONARIOS, que, EN EL CASO DE LOS INTERINOS, COMPORTARÁ LA REVOCACIÓN DE SU NOMBRAMIENTO, y que SÓLO PODRÁ SANCIONAR LA COMISIÓN DE FALTAS MUY GRAVES.
b) DEMÉRITO, que consistirá en la PENALIZACIÓN A EFECTOS DE CARRERA, PROMOCIÓN O MOVILIDAD VOLUNTARIA.
c) APERCIBIMIENTO.
d) CUALQUIER OTRA QUE SE ESTABLEZCA POR LEY.'),
('C088-0014','N TODO CASO a SIETE criterios:','
a) INTENCIONALIDAD.
b) PERTURBACIÓN que la conducta pueda producir en el NORMAL FUNCIONAMIENTO DEL SERVICIO.
c) DAÑOS Y PERJUICIOS O FALTA DE CONSIDERACIÓN que puedan suponer a los SUBORDINADOS Y CIUDADANOS.
d) REITERACIÓN Y REINCIDENCIA.
e) GRADO DE PARTICIPACIÓN.
f) TRASCENDENCIA de la conducta infractora PARA LA SEGURIDAD PÚBLICA, incrementando el riesgo o los efectos de la situación de emergen'),
('C088-0023','N TODO CASO a SIETE criterios:','
a) INTENCIONALIDAD.
b) PERTURBACIÓN que la conducta pueda producir en el NORMAL FUNCIONAMIENTO DEL SERVICIO.
c) DAÑOS Y PERJUICIOS O FALTA DE CONSIDERACIÓN que puedan suponer a los SUBORDINADOS Y CIUDADANOS.
d) REITERACIÓN Y REINCIDENCIA.
e) GRADO DE PARTICIPACIÓN.
f) TRASCENDENCIA de la conducta infractora PARA LA SEGURIDAD PÚBLICA, incrementando el riesgo o los efectos de la situación de emergen'),
('C088-0024','n con los siguientes recursos:','
a) PARTIDAS PRESUPUESTARIAS que prevean las Administraciones públicas de que dependan.
b) CONTRIBUCIONES ESPECIALES Y TASAS.
c) SUBVENCIONES, DONACIONES Y CUANTOS INGRESOS DE DERECHO PRIVADO puedan corresponderles.
d) RENDIMIENTOS DE PRECIOS PÚBLICOS.
e) LOS DEMÁS RECURSOS que puedan corresponderles.'),
('C088-0025','n con los siguientes recursos:','
a) PARTIDAS PRESUPUESTARIAS que prevean las Administraciones públicas de que dependan.
b) CONTRIBUCIONES ESPECIALES Y TASAS.
c) SUBVENCIONES, DONACIONES Y CUANTOS INGRESOS DE DERECHO PRIVADO puedan corresponderles.
d) RENDIMIENTOS DE PRECIOS PÚBLICOS.
e) LOS DEMÁS RECURSOS que puedan corresponderles.'),
('C089-0018','ts. 12 a 47), siete capítulos:','
I. Del funcionamiento general (12).'),
('C089-0035','ÁSTROFE O CALAMIDAD PÚBLICA, o','
- EN VIRTUD DE LAS CLÁUSULAS DEL CONVENIO que se haya establecido con otra Comunidad Autónoma o con el Estado.'),
('C089-0059','ARCIAL: EMPLEADOS PÚBLICOS que',', EN VIRTUD DE UN CONTRATO DE TRABAJO FORMALIZADO POR ESCRITO, en cualquiera de las modalidades de contratación previstas en la legislación laboral, prestan servicios RETRIBUIDOS por las Administraciones Públicas A TIEMPO PARCIAL y forman parte de un SPEIS, con las mismas funciones remitidas al art. 2 de la Ley y al art. 5 del Decreto.'),
('C089-0075',' apoyo y auxilio al ciudadano;',' c) intervención en operaciones de protección civil; d) participación en la elaboración de planes de emergencias; e) prevención y extinción de incendios; f) estudio e investigación de sistemas y técnicas; h) tráfico y accidentes de carretera, ferroviarios o aéreos; i) rescate y salvamento en el medio natural; j) investigación e información sobre causas, desarrollo y daños; k) obtención de información; l) medidas de…'),
('C089-0080','; k) obtención de información;',' l) medidas de seguridad extraordinarias y provisionales; m) ruina, hundimiento o demolición y deslizamiento del terreno; n) emisión de informes de proyectos de nueva construcción; ñ) asistencia técnica sobre evaluación de situaciones; o) colaboración en la protección del medio ambiente; p) participación en los traslados sanitarios de emergencia; q) campañas de información, formación y divulgación; r) fomento de la…'),
('C089-0100','la Ley 1/2013 CON DOS CAMBIOS:','
- Se INTERCALA una letra f) nueva: «A LAS DISTINCIONES Y PREMIOS QUE SE ESTABLEZCAN», que la ley no recoge como derecho. A partir de ahí todas las letras se desplazan una posición.
- Se AÑADE una letra n): «ADAPTACIÓN DEL PUESTO DE TRABAJO, PREFERENTEMENTE DENTRO DEL SPEIS DE LA ADMINISTRACIÓN EN LA QUE PRESTA SUS SERVICIOS, EN CASO DE ACCIDENTE DE TRABAJO O ENFERMEDAD.»
El resto es equivalente: remuneración justa…'),
('C089-0108','; información y participación;',' asistencia y defensa jurídica; no discriminación; vestuario y equipo; seguro de vida, accidentes y responsabilidad civil; prestación en condiciones adecuadas; carrera profesional; protección de la salud física y psíquica; y cláusula de cierre.'),
('C089-0110','la Ley 1/2013 CON DOS CAMBIOS:','
- La letra d), permanecer en el servicio hasta ser relevado, AÑADE: «LAS PROLONGACIONES DE LA JORNADA DE TRABAJO QUE SE PRODUZCAN POR ESTA CAUSA SERÁN COMPENSADAS EN LA FORMA QUE SE DISPONGA EN CADA SPEIS.» La ley no dice nada de compensar.
- Se AÑADE una letra j): «RESPETAR EL DERECHO A LA INFORMACIÓN Y EL EJERCICIO DEL DERECHO DE PARTICIPACIÓN EN TEMAS PROFESIONALES, A LA SINDICACIÓN Y NEGOCIACI'),
('C089-0115','e personas, animales y bienes;',' b) apoyo y auxilio al ciudadano; c) intervención en operaciones de protección civil; d) participación en la elaboración de planes de emergencias; e) prevención y extinción de incendios; f) estudio e investigación de sistemas y técnicas; h) tráfico y accidentes de carretera, ferroviarios o aéreos; i) rescate y salvamento en el medio natural; j) investigación e información sobre causas, desarrollo y daños; k)…'),
('C089-0139',' PARA DETERMINAR LA JERARQUÍA:','
a) El mando en la intervención deberá ser LA PERSONA QUE OSTENTE EL MAYOR GRADO DEL SERVICIO TITULAR EN EL TERRITORIO donde se haya producido la emergencia.
b) Si coinciden varias personas CON EL MISMO GRADO, mandará LA DE MAYOR ANTIGÜEDAD.
c) Si coinciden GRADO Y ANTIGÜEDAD, mandará LA PERSONA DE MAYOR EDAD.'),
('C089-0153','SIETE ASPECTOS que abarca:','
a) Las derivadas de NORMAS LEGALES, DISPOSICIONES Y ACUERDOS que afecten a los SPEIS.
b) INSTRUCCIONES sobre actos o actividades concretas y sobre modos y formas de prestación del Servicio, así como su reiteración.
c) El anuncio de todo lo concerniente a ASCENSOS Y PROVISIÓN DE PUESTOS DE TRABAJO.
d) El anuncio de CURSOS Y ACTIVIDADES de la ACADEMIA ARAGONESA DE BOMBEROS.
e) Los NOMBRAMIENTOS, CESES Y BAJAS,…'),
('C089-0178','RDINARIOS PODRÁN DIVIDIRSE EN:','
PARTE DE ACTUACIÓN.'),
('C089-0194','A DE TRATAR DE UN SOLO ASUNTO;',' b) deben dirigirse a la autoridad o mando correspondiente; c) en todo documento oficial, ANTES DE LA FIRMA, se consignará la ANTEFIRMA expresiva de la identificación personal, concreta y exacta; d) los INFORMES deben ser TERMINANTES Y BREVES, sin perjuicio de la clara exposición del asunto; e) los mandos, en los informes, MANIFESTARÁN SU OPINIÓN Y EXPONDRÁN LAS RAZONES que la fundamenten.'),
('C089-0196','n personal, concreta y exacta;',' d) los INFORMES deben ser TERMINANTES Y BREVES, sin perjuicio de la clara exposición del asunto; e) los mandos, en los informes, MANIFESTARÁN SU OPINIÓN Y EXPONDRÁN LAS RAZONES que la fundamenten.'),
('C089-0197','a clara exposición del asunto;',' e) los mandos, en los informes, MANIFESTARÁN SU OPINIÓN Y EXPONDRÁN LAS RAZONES que la fundamenten.'),
('C089-0208','DO CASO CARÁCTER ELIMINATORIO:','
a) RECONOCIMIENTO MÉDICO que garantice la idoneidad del aspirante para la función a desempeñar.
b) PRUEBAS FÍSICAS adecuadas a la capacidad necesaria para las funciones a realizar.
c) PRUEBAS PSICOTÉCNICAS orientadas a medir el PERFIL PROFESIONAL del aspirante.
d) PRUEBAS DE CAPACITACIÓN DE CONOCIMIENTOS GENERALES, ASÍ COMO DE CONOCIMIENTOS ESPECÍFICOS, en materias relacionadas con el ejercicio profesional.'),
('C089-0219','empleo público y EN TODO CASO:','
a) NACIONALIDAD española o de un Estado miembro de la Unión Europea (art. 57 de la Ley 7/2007, EBEP), extendido a los Tratados internacionales con libre circulación de trabajadores.
b) Estar EN POSESIÓN O EN CONDICIONES DE OBTENER, A FECHA DE FINALIZACIÓN DEL PERIODO DE PRESENTACIÓN DE INSTANCIAS, las titulaciones académicas exigibles.
c) CUMPLIR LAS CONDICIONES FÍSICAS Y PSÍQUICAS exigibles, no padeciendo…'),
('C089-0257','arts. 1 a 11), tres capítulos:','
I. Disposiciones generales (1-5).'),
('C089-0280','LASES: a) VERBALES O ESCRITAS;',' b) GENERALES O PARTICULARES; c) ORDINARIAS O EXTRAORDINARIAS.'),
('C089-0285','A DE TRATAR DE UN SOLO ASUNTO;',' b) deben dirigirse a la autoridad o mando correspondiente; c) en todo documento oficial, ANTES DE LA FIRMA, se consignará la ANTEFIRMA expresiva de la identificación personal, concreta y exacta; d) los INFORMES deben ser TERMINANTES Y BREVES, sin perjuicio de la clara exposición del asunto; e) los mandos, en los informes, MANIFESTARÁN SU OPINIÓN Y EXPONDRÁN LAS RAZONES que la fundamenten.'),
('C089-0291','DO CASO CARÁCTER ELIMINATORIO:','
a) RECONOCIMIENTO MÉDICO que garantice la idoneidad del aspirante para la función a desempeñar.
b) PRUEBAS FÍSICAS adecuadas a la capacidad necesaria para las funciones a realizar.
c) PRUEBAS PSICOTÉCNICAS orientadas a medir el PERFIL PROFESIONAL del aspirante.
d) PRUEBAS DE CAPACITACIÓN DE CONOCIMIENTOS GENERALES, ASÍ COMO DE CONOCIMIENTOS ESPECÍFICOS, en materias relacionadas con el ejercicio profesional.'),
('C089-0307','la Ley 1/2013 CON DOS CAMBIOS:','
- La letra d), permanecer en el servicio hasta ser relevado, AÑADE: «LAS PROLONGACIONES DE LA JORNADA DE TRABAJO QUE SE PRODUZCAN POR ESTA CAUSA SERÁN COMPENSADAS EN LA FORMA QUE SE DISPONGA EN CADA SPEIS.» La ley no dice nada de compensar.
- Se AÑADE una letra j): «RESPETAR EL DERECHO A LA INFORMACIÓN Y EL EJERCICIO DEL DERECHO DE PARTICIPACIÓN EN TEMAS PROFESIONALES, A LA SINDICACIÓN Y NEGOCIACI'),
('C090-0035',' DEL INTERESADO, en DOS CASOS:','
a) Tras producirse una VACANTE Y NO HABER RESULTADO SOLICITUDES para cubrirla. En tal caso SE ATENDERÁ AL ORDEN INVERSO DE ANTIGÜEDAD para su provisión forzosa, de entre los funcionarios que reúnan las condiciones.
b) ENTRE LOS ASPIRANTES DE UN PROCESO SELECTIVO, respecto de las plazas ofertadas para su toma de posesión, SI NO FUERAN SELECCIONADAS POR NINGÚN ASPIRANTE.
2. La propuesta deberá ponerse de manifiesto a…'),
('C090-0049',' DE MÉRITOS, siempre y cuando:','
a) PERTENEZCAN A IDÉNTICA CATEGORÍA.
b) ACREDITEN HABER SUPERADO, en el acceso a la categoría convocada, PRUEBAS SIMILARES a las fijadas en la convocatoria de movilidad.
c) SUPEREN LAS PRUEBAS FÍSICAS adecuadas a la capacidad necesaria a la categoría y a las funciones a realizar.
3. El ACCESO AL CUERPO INMEDIATAMENTE SUPERIOR DENTRO DEL MISMO GRUPO se realizará mediante CONCURSO, previa acreditación de haber…'),
('C090-0051',' LA ADMINISTRACIÓN CONVOCANTE:','
a) CONCURSO-OPOSICIÓN LIBRE.
b) CONCURSO ENTRE FUNCIONARIOS DE CARRERA del mismo o de otro SPEIS que pertenezcan a IGUAL O SUPERIOR CATEGORÍA.
c) LIBRE DESIGNACIÓN entre funcionarios pertenecientes a los distintos SPEIS DE CUALQUIER COMUNIDAD AUTÓNOMA.'),
('C090-0062',' DE MÉRITOS, siempre y cuando:','
a) PERTENEZCAN A IDÉNTICA CATEGORÍA.
b) ACREDITEN HABER SUPERADO, en el acceso a la categoría convocada, PRUEBAS SIMILARES a las fijadas en la convocatoria de movilidad.
c) SUPEREN LAS PRUEBAS FÍSICAS adecuadas a la capacidad necesaria a la categoría y a las funciones a realizar.
3. El ACCESO AL CUERPO INMEDIATAMENTE SUPERIOR DENTRO DEL MISMO GRUPO se realizará mediante CONCURSO, previa acreditación de haber…'),
('C090-0137','NCIAS para poder ser premiado:','
a) RESULTEN AFECTADOS EN SU INTEGRIDAD FÍSICA en acto de servicio o como consecuencia de éste.
b) DIRIJAN O REALICEN UN SERVICIO DE RELEVANCIA PROFESIONAL que redunde en el prestigio del Servicio.
c) DISTINGUIRSE NOTORIAMENTE POR SU COMPETENCIA Y ACTIVIDAD en el cumplimiento de sus deberes profesionales.
d) REALICEN ESTUDIOS O TRABAJOS PROFESIONALES DESTACADOS que redunden en la mejora de las funciones…'),
('C090-0167','VERÁN LAS CONDICIONES PARA QUE',', EN LAS INTERVENCIONES EN LAS QUE PARTICIPEN, CUENTEN CON UNA RED DE COMUNICACIONES COMÚN EN TODO EL ÁMBITO TERRITORIAL DE LA COMUNIDAD DE ARAGÓN.'),
('C090-0213','XTO, VERIFICADA CONTRA EL BOA:','
17 ARTÍCULOS, en CINCO CAPÍTULOS, más UNA DISPOSICIÓN ADICIONAL ÚNICA y DOS DISPOSICIONES FINALES.'),
('C090-0235','IONES BÁSICAS, letras a) a l):','
a) Impartir los CURSOS SELECTIVOS para los profesionales de los SPEIS, CAPACITACIÓN PARA EL ASCENSO Y ESPECIALIZACIÓN Y RECICLAJE DEL PERSONAL.
b) Impartir los CURSOS DE FORMACIÓN PARA CADA UNA DE LAS ESPECIALIDADES que integran los Servicios.
c) FORMAR PERMANENTEMENTE al personal de los SPEIS.
d) HABILITAR para el desempeño de funciones de BOMBERO VOLUNTARIO Y BOMBERO DE EMPRESA y, en su caso, impartir los…'),
('C090-0250','S ECONÓMICOS. Cuatro recursos:','
a) APORTACIONES DEL GOBIERNO DE ARAGÓN O DE CUALQUIER OTRA ADMINISTRACIÓN previstas en sus partidas presupuestarias.
b) SUBVENCIONES, DONACIONES O AYUDAS DE CUALQUIER PERSONA FÍSICA O JURÍDICA.
c) TASAS Y PRECIOS PÚBLICOS.
d) CUALESQUIERA OTROS DE NATURALEZA PÚBLICA O PRIVADA.'),
('C090-0281',' VOCALES, doce letras a) a l):','
a) TRES VOCALES designados por el CONSEJERO competente en materia de protección civil.
  b) UN VOCAL designado por el Consejero competente en materia de EDUCACIÓN.
  c) UN VOCAL designado por el Consejero competente en materia de MEDIO AMBIENTE.
  d) UN REPRESENTANTE DE CADA UNA DE LAS DIPUTACIONES PROVINCIALES DE HUESCA, TERUEL Y ZARAGOZA.
  e) UN REPRESENTANTE DEL AYUNTAMIENTO DE ZARAGOZA.
  f)'),
('C090-0286',' RECTOR. Nueve letras a) a i):','
a) ESTABLECER LOS OBJETIVOS Y DIRECTRICES GENERALES DE ACTUACIÓN de la Academia.
b) APROBAR LA MEMORIA ANUAL DEL CURSO PRECEDENTE.
c) APROBAR EL PLAN DE ESTUDIOS de todos los cursos que dependan de la Academia.
d) APROBAR LOS BAREMOS REGULADORES DE LAS REMUNERACIONES DE LAS ACTIVIDADES DOCENTES.
e) INFORMAR EL REGLAMENTO DE RÉGIMEN INTERIOR de la Academia.
f) INFORMAR LAS PROPUESTAS DE CONVENIOS DE COLABORACIÓN a…'),
('C090-0310','UNCIONES, once letras a) a k):','
a) La DIRECCIÓN Y GESTIÓN de la Academia.
b) La EJECUCIÓN DE LOS PROGRAMAS DE FORMACIÓN aprobados por el Consejo Rector.
c) EJECUTAR Y HACER CUMPLIR LOS ACUERDOS adoptados por el Consejo Rector.
d) ELABORAR LA MEMORIA ANUAL DEL CURSO.
e) ELABORAR Y PROPONER EL PLAN DE ESTUDIOS al Consejo Rector.
f) FORMULAR PROPUESTAS al Consejo Rector en asuntos que le competan.
g) DIRIGIR, IMPULSAR E INSPECCIONA'),
('C091-0010','los profesores las siguientes:','
a) IMPARTIR SUS CLASES, OBSERVANDO LOS PROGRAMAS, CONTENIDOS, METODOLOGÍA Y FORMAS DE EVALUACIÓN INDICADAS POR EL DIRECTOR DE LA ACADEMIA.
b) COMUNICAR CUANTAS INCIDENCIAS TENGAN LUGAR DURANTE EL DESARROLLO DE SUS CLASES a los mencionados responsables.
c) COMUNICAR CON LA MAYOR ANTELACIÓN SU IMPOSIBILIDAD DE ASISTENCIA A CLASE PARA EFECTUAR LA CORRESPONDIENTE SUSTITUCIÓN.
2. EL INCUMPLIMIENTO DE L'),
('C091-0011','los profesores las siguientes:','
a) IMPARTIR SUS CLASES, OBSERVANDO LOS PROGRAMAS, CONTENIDOS, METODOLOGÍA Y FORMAS DE EVALUACIÓN INDICADAS POR EL DIRECTOR DE LA ACADEMIA.
b) COMUNICAR CUANTAS INCIDENCIAS TENGAN LUGAR DURANTE EL DESARROLLO DE SUS CLASES a los mencionados responsables.
c) COMUNICAR CON LA MAYOR ANTELACIÓN SU IMPOSIBILIDAD DE ASISTENCIA A CLASE PARA EFECTUAR LA CORRESPONDIENTE SUSTITUCIÓN.
2. EL INCUMPLIMIENTO DE L'),
('C091-0019','17.1. TRES DERECHOS:','
a) RECIBIR UNA FORMACIÓN que garantice el desarrollo de cuantos ASPECTOS PROFESIONALES Y HUMANOS sean necesarios para el eficaz cumplimiento de las funciones encomendadas e inherentes a su labor, DENTRO DEL MARCO CONSTITUCIONAL.
b) PARTICIPAR EN SU PROCESO FORMATIVO, solicitando las resoluciones de dudas que estimen oportunas de los profesores, planteando los problemas que les surjan en torno al desarrollo de la…'),
('C091-0034','17.2. CUATRO DEBERES:','
a) OBSERVAR EL EXACTO CUMPLIMIENTO DE CUANTAS DISPOSICIONES Y NORMAS TENGA LA ACADEMIA DE BOMBEROS.
b) ASISTIR A LA TOTALIDAD DE LAS CLASES, SALVO EN LOS CASOS DEBIDAMENTE JUSTIFICADOS.
c) COLABORAR CON EL PROFESORADO Y SUS PROPIOS COMPAÑEROS en el desarrollo de las diferentes actividades académicas y, en general, CREANDO EL CLIMA DE RESPETO, PARTICIPACIÓN Y AFÁN DE SUPERACIÓN que debe reinar en t')) as v(id, cola, ext)
  where b.id = v.id and right(b.cita, 30) = v.cola and (b.editada_at is null or b.id = 'C001-0021')
  returning 1)
select 'lote 12: ' || count(*) || ' de 85 citas ampliadas' as resultado from u;
