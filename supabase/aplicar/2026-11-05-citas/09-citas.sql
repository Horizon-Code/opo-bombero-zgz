-- Lote 9: amplía la cita (texto literal que sigue en el bloque del corpus) de 160 preguntas.
-- Guardas: solo si la cita actual acaba exactamente como la que se amplió, y no está editada a mano.
with u as (
  update public.banco_preguntas b set cita = b.cita || v.ext, editada_at = now()
  from (values
('C064-0122','uras y otras lesiones locales;',' parálisis y convulsiones; trastornos de los órganos de los sentidos.'),
('C064-0323',' de VERIFICACIONES eléctricas;',' normativa de las compañías (Iberdrola, Endesa); recomendaciones UNESA; normas UNE-EN; reglamentación MUNICIPAL.'),
('C064-0341','ros minutos son determinantes:',' el intervalo entre el estado de MUERTE APARENTE (los signos vitales parecen faltar, sin que la detención de la vida sea definitiva) y el de MUERTE REAL es cuando deben aplicarse las maniobras de REANIMACIÓN, siempre con entrenamiento; si no, acompañar al herido hasta que llegue un profesional (remisión al «Manual de intervenciones sanitarias en emergencias»).'),
('C064-0344','o de corriente por el CORAZÓN;',' se interrumpe la circulación y en pocos minutos hay lesiones IRREVERSIBLES DEL CEREBRO.'),
('C064-0345','LE); gravedad según el órgano;',' un calentamiento excesivo de núcleos nerviosos puede desembocar en PARÁLISIS LOCALIZADA.'),
('C064-0347','ualmente ningún daño orgánico;',' con duración SUPERIOR A DOS SEGUNDOS pueden producirse contracciones musculares que dificultan la respiración y paradas temporales del corazón SIN llegar a la fibrilación ventricular.'),
('C064-0353','Tras el protocolo general:','
a) VERIFICAR EL CORTE DE ENERGÍA: cuando la compañía comunica el corte, se verifica que no hay tensión en los conductores de fase y según la instalación:
- SUBESTACIONES TRANSFORMADORAS (ST): verificar que las líneas entrantes y salientes están EN DESCARGO (a tierra y en cortocircuito). Especial cuidado con equipos incendiados con gran volumen de ACEITES (transformadores, interruptores, aparamenta): por altas…'),
('C064-0354','aislar el incendio en un área;',' valorar riesgos cercanos y balizar según distancias de seguridad y posible EXPLOSIÓN DE LA APARAMENTA.'),
('C064-0356','propagación según envergadura;',' si se puede entrar, comprobar dónde está el incendio y delimitar zona de AT y de BT: en BT proceder al CORTE Y EXTINCIÓN, en AT ESPERAR al descargo.'),
('C064-0360','a caja de conexión de cada una',' y desconectar o cortar los cables de los CUATRO BORNES para dejar aislada la farola.'),
('C064-0364','to en la medida de lo posible;',' puede que no se pueda REARMAR un cuadro si el siniestro destruyó las protecciones (el propietario debe reparar).'),
('C064-0365',' 20572 partes 1 y 2 (CEI 479):','
- ALTERNA DE FRECUENCIAS SUPERIORES A 100 Hz: cuanto más aumenta la frecuencia, más DISMINUYEN los riesgos de FIBRILACIÓN, pero AUMENTAN los de QUEMADURAS. Las condiciones de protección contra contactos indirectos son idénticas a 400 Hz que a 50 o 60 Hz: pueden emplearse los mismos DIFERENCIALES. El factor de frecuencia aumenta con la frecuencia. La corriente produce un DAÑO MÁXIMO a 50/60 Hz: la intensidad de…'),
('C065-0026',' 2 y 4 corresponden a la C.E.;',' en BT todas las reglas las hacen C.E. o Bomberos.'),
('C065-0027',' 2 y 4 corresponden a la C.E.;',' en BT todas las reglas las hacen C.E. o Bomberos.'),
('C065-0037',' y refuerzos propios y ajenos;',' mientras las fuerzas del orden evacuan, el mando planifica zonificación, control de propagación, petición de corte, ventilación táctica, refrigeración y extinción.'),
('C065-0042',' ha transcurrido mucho tiempo;',' si se interviene tarde, se transmite por PASOS DE CABLEADO MAL SELLADOS en muros o por cableados en cuadros de ascensores.'),
('C065-0049',' quedar retenido en la CUBETA;',' si no, cae filtrándose entre la GRAVA del suelo, donde se extingue.'),
('C065-0051','úmero de torre o subestación);',' los elementos de corte deben quedar ENCLAVADOS; en una ST cortar todas las líneas entrantes y salientes; si hay cuadro de BT bajo la torre, cortar con el interruptor o retirando fusibles.'),
('C065-0052',' líneas entrantes y salientes;',' si hay cuadro de BT bajo la torre, cortar con el interruptor o retirando fusibles.'),
('C065-0054','corte deben quedar ENCLAVADOS;',' en una ST cortar todas las líneas entrantes y salientes; si hay cuadro de BT bajo la torre, cortar con el interruptor o retirando fusibles.'),
('C065-0056',' de tensión en cada conductor;',' en AT es OBLIGATORIA la puesta a tierra y en corto.'),
('C065-0058','ORES para mantener distancias;',' entre torres metálicas el transformador puede CAER por fatiga del soporte; sin corte previo, chorro discontinuo de agua o espuma; rupturas violentas; en CT SUBTERRÁNEO INUNDADO puede producirse VAPOR DE AGUA que salga por los respiraderos.'),
('C065-0059','e CAER por fatiga del soporte;',' sin corte previo, chorro discontinuo de agua o espuma; rupturas violentas; en CT SUBTERRÁNEO INUNDADO puede producirse VAPOR DE AGUA que salga por los respiraderos.'),
('C065-0060',' o espuma; rupturas violentas;',' en CT SUBTERRÁNEO INUNDADO puede producirse VAPOR DE AGUA que salga por los respiraderos.'),
('C065-0063','ne los fusibles y el contador;',' la línea de entrada viene del CT de la zona y la de salida (desde el aparato de medida) desemboca en el cuadro de mando y protección interior.'),
('C065-0077','es con el interruptor general;',' VENTILAR abriendo huecos y colocando un VENTILADOR EN LA PUERTA DE ACCESO.'),
('C065-0078','evacuar (fuerzas del orden);',' cortar DESDE EL EXTERIOR con retirada rápida de fusibles en la CGP (para no cebar arco) o, si la fuga lo permite, desde el cuarto de contadores con el interruptor general; VENTILAR abriendo huecos y colocando un VENTILADOR EN LA PUERTA DE ACCESO.'),
('C065-0087','ón: igual si es UN SOLO CABLE;',' si se cortan DOS FASES no se recomienda manipular la máquina: está EN CORTOCIRCUITO.'),
('C065-0088','anular el EFECTO CONDENSADOR);',' son los CABLES ROJOS que en las torres van de arriba abajo para meterse bajo tierra; entran en las celdas por su parte baja y pueden ir a EMBARRADOS subterráneos al mismo nivel de tensión.'),
('C065-0090','bajo para meterse bajo tierra;',' entran en las celdas por su parte baja y pueden ir a EMBARRADOS subterráneos al mismo nivel de tensión.'),
('C065-0114',' DIELÉCTRICOS: caucho natural;',' alargamiento a la ruptura ≤ 600 %; resistencia a la perforación ≥ 18 N/mm; a la tracción ≥ 16 MPa; remanencia ≤ 15 %; frío: 1 hora a −25 ± 3 °C; llama 10 segundos en un dedo.'),
('C065-0115','gamiento a la ruptura ≤ 600 %;',' resistencia a la perforación ≥ 18 N/mm; a la tracción ≥ 16 MPa; remanencia ≤ 15 %; frío: 1 hora a −25 ± 3 °C; llama 10 segundos en un dedo.'),
('C065-0116',' N/mm; a la tracción ≥ 16 MPa;',' remanencia ≤ 15 %; frío: 1 hora a −25 ± 3 °C; llama 10 segundos en un dedo.'),
('C065-0117','n ≥ 16 MPa; remanencia ≤ 15 %;',' frío: 1 hora a −25 ± 3 °C; llama 10 segundos en un dedo.'),
('C065-0118','remanencia ≤ 15 %;',' frío: 1 hora a −25 ± 3 °C; llama 10 segundos en un dedo.'),
('C065-0134','EGORÍA III (UNE-EN 60903:2003;',' directiva 89/686/CEE, riesgos mortales).'),
('C065-0136','ción visual y de fuga de aire;',' resto, además ensayo dieléctrico; NO usar guantes de clase 1-4, ni nuevos, sin verificar en los ÚLTIMOS 6 MESES.'),
('C065-0137','to, además ensayo dieléctrico;',' NO usar guantes de clase 1-4, ni nuevos, sin verificar en los ÚLTIMOS 6 MESES.'),
('C065-0153','es de HASTA 25 mm de diámetro;',' mangos de poliéster con fibra de vidrio (50 mm de longitud y 32 mm de diámetro); tensión de aislamiento 25 kV; adhesivo con tensión máxima, condiciones exterior/interior, modelo, fabricante y año.'),
('C065-0154','tensión de aislamiento 25 kV;',' adhesivo con tensión máxima, condiciones exterior/interior, modelo, fabricante y año.'),
('C065-0155','longitud y 32 mm de diámetro);',' tensión de aislamiento 25 kV; adhesivo con tensión máxima, condiciones exterior/interior, modelo, fabricante y año.'),
('C065-0157','ados y dos cuchillas de acero;',' corta cables de HASTA 25 mm de diámetro; mangos de poliéster con fibra de vidrio (50 mm de longitud y 32 mm de diámetro); tensión de aislamiento 25 kV; adhesivo con tensión máxima, condiciones exterior/interior, modelo, fabricante y año.'),
('C065-0158',' tipo B EXTERIOR (intemperie);',' tensiones 20, 30, 45 y 66 kV; norma UNE 204001.'),
('C065-0160','rma, patas y CONTERAS de goma;',' tipo A INTERIOR, tipo B EXTERIOR (intemperie); tensiones 20, 30, 45 y 66 kV; norma UNE 204001.'),
('C065-0169','ANTE: caucho o goma sintética;',' espesor 3 mm → 30 kV de perforación; 4,5 mm → 50 kV (modelos Sofamel SP, de 0,6 × 0,6 a 1 × 10 m).'),
('C065-0174','o que evita ABRIR el circuito;',' sensor en forma de pinza que abraza el cable; medida INDIRECTA por el campo magnético; pasar UN SOLO CONDUCTOR (dos conductores de un mismo cable dan lectura CERO); rangos 200 A / 600 A; conductor máximo unos 33 mm; no usar en circuitos SUPERIORES A 600 V ca; garras de acero con puntas NO aisladas; norma EN 61010-1.'),
('C065-0175','IRECTA por el campo magnético;',' pasar UN SOLO CONDUCTOR (dos conductores de un mismo cable dan lectura CERO); rangos 200 A / 600 A; conductor máximo unos 33 mm; no usar en circuitos SUPERIORES A 600 V ca; garras de acero con puntas NO aisladas; norma EN 61010-1.'),
('C065-0176','mismo cable dan lectura CERO);',' rangos 200 A / 600 A; conductor máximo unos 33 mm; no usar en circuitos SUPERIORES A 600 V ca; garras de acero con puntas NO aisladas; norma EN 61010-1.'),
('C065-0177','rcuitos SUPERIORES A 600 V ca;',' garras de acero con puntas NO aisladas; norma EN 61010-1.'),
('C065-0178','; conductor máximo unos 33 mm;',' no usar en circuitos SUPERIORES A 600 V ca; garras de acero con puntas NO aisladas; norma EN 61010-1.'),
('C065-0179','rangos 200 A / 600 A;',' conductor máximo unos 33 mm; no usar en circuitos SUPERIORES A 600 V ca; garras de acero con puntas NO aisladas; norma EN 61010-1.'),
('C065-0183','10 A si no se conoce el valor;',' continuidad: pitido si la resistencia es INFERIOR A 50 Ω; medir siempre desde el rango MÁXIMO si el valor es desconocido; cuidado especial por encima de 60 V cc o 30 V rms ca; normas CAT III 1.000 V y CAT IV 600 V, IEC/EN 61010-1.'),
('C065-0184','esistencia es INFERIOR A 50 Ω;',' medir siempre desde el rango MÁXIMO si el valor es desconocido; cuidado especial por encima de 60 V cc o 30 V rms ca; normas CAT III 1.000 V y CAT IV 600 V, IEC/EN 61010-1.'),
('C065-0185','MO si el valor es desconocido;',' cuidado especial por encima de 60 V cc o 30 V rms ca; normas CAT III 1.000 V y CAT IV 600 V, IEC/EN 61010-1.'),
('C065-0186','cima de 60 V cc o 30 V rms ca;',' normas CAT III 1.000 V y CAT IV 600 V, IEC/EN 61010-1.'),
('C065-0188','tal (más preciso) o analógico;',' punta NEGRA siempre al borne COM.'),
('C065-0189','es, resistencias, continuidad;',' digital (más preciso) o analógico; punta NEGRA siempre al borne COM.'),
('C065-0190',' en instalaciones exteriores);',' JUEGO DE CLEMAS; EMPUÑADURA PARA QUITAR FUSIBLES (baquelita; soporta hasta 5.000 V, uso limitado a 1.000 V; retira fusibles de CUCHILLA de las CGP); LLAVE DE CRUZ AISLADA (cuatro vasos).'),
('C065-0191','ietileno; hasta 80 °C y 600 V;',' NEGRA obligatoria en instalaciones exteriores); JUEGO DE CLEMAS; EMPUÑADURA PARA QUITAR FUSIBLES (baquelita; soporta hasta 5.000 V, uso limitado a 1.000 V; retira fusibles de CUCHILLA de las CGP); LLAVE DE CRUZ AISLADA (cuatro vasos).'),
('C065-0192','000 V, uso limitado a 1.000 V;',' retira fusibles de CUCHILLA de las CGP); LLAVE DE CRUZ AISLADA (cuatro vasos).'),
('C065-0196','A AISLANTE (PVC o polietileno;',' hasta 80 °C y 600 V; NEGRA obligatoria en instalaciones exteriores); JUEGO DE CLEMAS; EMPUÑADURA PARA QUITAR FUSIBLES (baquelita; soporta hasta 5.000 V, uso limitado a 1.000 V; retira fusibles de CUCHILLA de las CGP); LLAVE DE CRUZ AISLADA (cuatro vasos).'),
('C065-0199',' varios tramos con empuñadura;',' de SALVAMENTO o de VERIFICACIÓN de ausencia de tensión; también verificador (luminoso y sonoro para 10-30 kV) y CRUZ DE MANIOBRA.'),
('C065-0202','to, además ensayo dieléctrico;',' NO usar guantes de clase 1-4, ni nuevos, sin verificar en los ÚLTIMOS 6 MESES.'),
('C065-0207',' tipo B EXTERIOR (intemperie);',' tensiones 20, 30, 45 y 66 kV; norma UNE 204001.'),
('C065-0209',' o espuma; rupturas violentas;',' en CT SUBTERRÁNEO INUNDADO puede producirse VAPOR DE AGUA que salga por los respiraderos.'),
('C065-0215','n poste: llamar a la compañía;',' mientras, ir al cuadro de baja y cortar (si lo hay), controlar la propagación y enfriar/extinguir con CHORRO DISCONTINUO de agua o espuma, o con extintor de CO2 y/o polvo (HASTA 35 kV).'),
('C066-0009','que durante el trayecto serán:','
- CORTAS Y SENCILLAS: vía RADIO, escuchadas por todo el tren de ataque.
- MÁS LARGAS, las que necesiten explicaciones o intercambio de impresiones: vía MÓVIL, con el Jefe de intervención.'),
('C066-0010',' teniendo en cuenta el Parque:','
- Más PRÓXIMO al siniestro.
- El que cuente en ese momento con los MEDIOS ADECUADOS para intervenir, completando estos medios con efectivos de otros Parques si fuera necesario.'),
('C066-0013',' a tomar en el primer momento:','
- Nombre.
- Teléfono.
- Dirección: carretera o tipo de vía, punto kilométrico y sentido del accidente.
- Número de vehículos implicados: turismo, furgoneta, mercancías.
- Número de víctimas.
- Tipo.
- Mercancías.
- Incendio.'),
('C066-0016',' a tomar en el primer momento:','
- Nombre.
- Teléfono.
- Dirección: carretera o tipo de vía, punto kilométrico y sentido del accidente.
- Número de vehículos implicados: turismo, furgoneta, mercancías.
- Número de víctimas.
- Tipo.
- Mercancías.
- Incendio.'),
('C066-0017',' a tomar en el primer momento:','
- Nombre.
- Teléfono.
- Dirección: carretera o tipo de vía, punto kilométrico y sentido del accidente.
- Número de vehículos implicados: turismo, furgoneta, mercancías.
- Número de víctimas.
- Tipo.
- Mercancías.
- Incendio.'),
('C066-0036','vehículos de emergencias será:','
1. PROTEGERNOS del resto de vehículos que circulan por la vía.
2. RESPETAR los espacios de zonas de actuación: caliente, templada y fría.
3. ORIENTAR los vehículos para facilitar el acceso a herramientas y materiales POR EL LADO SEGURO.'),
('C066-0041','vehículos se tendrá en cuenta:','
- ESTACIONAMIENTO DEFENSIVO.
- HERRAMIENTAS AL LADO SEGURO.
- RESPETAR ZONAS DE INTERVENCIÓN.
- LIBRE SALIDA PARA LA UVI MÓVIL.'),
('C066-0042','vehículos se tendrá en cuenta:','
- ESTACIONAMIENTO DEFENSIVO.
- HERRAMIENTAS AL LADO SEGURO.
- RESPETAR ZONAS DE INTERVENCIÓN.
- LIBRE SALIDA PARA LA UVI MÓVIL.'),
('C066-0055','A — DE 5 A 10 METROS. Área de:','
- Vehículos de bomberos y sanitarios.
- Zona limpia.
- Zona sucia.
- Zona de espera de todo el personal de apoyo.'),
('C066-0076','los posibles riesgos externos:','
- Entorno no seguro: riesgos eléctricos, MMPP.
- Fugas de combustible y derrames.
- Inestabilidad.
- Restos de vehículos (zona sucia).
- Nuevas tecnologías.'),
('C066-0097','MEDIDAS SEGÚN EL DERRAME:','
- Derrame MENOR de gasolina: preparar tendido de espuma y mantenerlo preventivamente sin llegar a utilizarlo, salvo que se produzca el incendio, que es más peligroso.
- Derrame IMPORTANTE de gasolina: cubrir con espuma.
- Derrame de GASÓLEO: cubrir con SEPIOLITA.'),
('C066-0110','para todos los intervinientes:','
- Mono polivalente.
- Casco F2.
- Gafas de protección.
- Mascarilla FFP3 (para los miembros de la ambulancia puede ser FFP2).
- Botas de intervención.
- Guantes de nitrilo.
- Guantes anticorte.
- Walkie.
- Linterna.'),
('C066-0180','L. Se accederá POR ESTE ORDEN:','
1. Espacios CREADOS: ventanilla bajada, puerta funcional.
2. Espacios POR CREAR:
   - Accionando mecanismos del vehículo ANTES DE DESCONECTAR LA BATERÍA: techo eléctrico, ventanillas, portones, puertas correderas, asientos eléctricos.
   - Actuando: tratamiento o rotura de cristales, excarcelando puerta o portón.'),
('C066-0191','e realizará APOYO PSICOLÓGICO:','
- Presentarse: nombre y profesión.
- Preguntar su nombre y qué ha sucedido.
- Mantener contacto visual en todo momento y a su misma altura si es posible.'),
('C066-0218','je sigue la sistemática C-ABC:','
IMPRESIÓN GENERAL: acercarse DE FRENTE para que no mueva la cabeza; valorar edad aproximada, sexo, peso y apariencia; observar posición corporal, lesiones obvias y sangrados evidentes; estabilización manual de la cabeza en posición neutra, sin traccionar, manteniendo inmovilización bimanual.'),
('C066-0270','ASTA 5 METROS. Área operativa:','
- Personal con EPI.
- Libre de herramientas sin uso.
- Libre de restos de vehículos.'),
('C066-0273','líneas de trabajo simultáneas:','
- Planes y maniobras de excarcelación, A, B y de emergencia (Subjefe de Intervención).
- Atención de heridos y valoración de la escena (sanitarios): número mediante triaje con método START, estado mediante valoración primaria, y ubicación.
- Acceso inicial (Bombero).'),
('C066-0289','s; señalización del accidente;',' nexo con el subjefe en la petición de medios y comunicación con la central; DESCONEXIÓN DE LA BATERÍA del vehículo; apoyo al conductor del FSV en la bajada y puesta en marcha del equipo hidráulico, generador e iluminación; apoyo emocional a posibles víctimas; supervisar recogida y limpieza de material.'),
('C066-0290','imiento 360º junto al Subjefe;',' determinar y supervisar el establecimiento de las zonas de intervención, ubicando la ZONA LIMPIA CON EXTINTOR y estableciendo la ZONA SUCIA; consultar la APP Rescue Code; determinar planes y maniobras junto al subjefe; supervisar el reparto de tareas de los bomberos a su cargo; dirigir y colaborar en las maniobras; asegurar la correcta recogida y limpieza del material.'),
('C066-0291',' y colaborar en las maniobras;',' asegurar la correcta recogida y limpieza del material.'),
('C066-0293','olocación idónea del vehículo;',' establecer medidas de seguridad contra un posible incendio, tendido SOS y línea de agua o PROPAK; iluminación de la zona; puesta en marcha de los motores necesarios; atención a las necesidades de material de los bomberos; recogida, revisión y limpieza.'),
('C066-0297','so al interior para colaborar;',' colabora en inmovilización, movilización y extracción.'),
('C066-0299','n inmovilización y extracción;',' recogida de los restos de material sanitario, que SON RESTOS BIOLÓGICOS.'),
('C066-0300','s sanitarias ni de evacuación;',' apoyo al conductor del FSV en señalización e iluminación; manejo de la camilla con el BAX; aproximar el material necesario (collarín cervical, tablero espinal, oxígeno); asistir a médico y enfermero; colaborar en inmovilización y extracción; recogida de los restos de material sanitario, que SON RESTOS BIOLÓGICOS.'),
('C066-0301',' momento a médico y enfermero;',' APOYO EMOCIONAL a posibles víctimas; entrar en el vehículo siniestrado para estabilización y apoyo a las víctimas, protegiéndolas de cristales y ruidos e informándolas de las acciones; colaborar en inmovilización y extracción.'),
('C067-0137','e algunas materias peligrosas;',' este indicador se convierte en particularmente importante en un INCIDENTE EN EL TRANSPORTE.'),
('C067-0283','NA PELIGROSAMENTE CON EL AGUA:',' el agua solo puede utilizarse con la APROBACIÓN DE EXPERTOS.'),
('C068-0125',' SUPERIOR A 300 KPA (3 BAR), o',' b) esté por completo en estado gaseoso a 20 °C a la presión normalizada de 101,3 KPA.'),
('C068-0186',' la estructura BIVALENTE -O-O-',' y pueden considerarse derivados del PERÓXIDO DE HIDRÓGENO con uno o dos hidrógenos sustituidos por radicales orgánicos.'),
('C069-0008','Recoge DIECISÉIS epígrafes:','
1. Identificación de la sustancia o mezcla y de la sociedad o empresa
2. Identificación de los peligros
3. Composición e información sobre los componentes
4. Primeros auxilios
5. Medidas de lucha contra incendios
6. Medidas en caso de liberación accidental
7. Manipulación y almacenamiento
8. Control de exposición y protección individual
9. Propiedades físicas y químicas
10. Estabilidad y reactivid'),
('C069-0163','dos los parámetros relevantes:',' naturaleza del producto, temperatura, presión, cantidad, partes del cuerpo expuestas, condiciones climáticas, intensidad del trabajo, etc. Esa evaluación orienta sobre materiales, diseño y combinación con otros EPI.'),
('C069-0166',' LSI 17 % en volumen con aire;',' al añadir CO₂, el LII SIGUE SIENDO 4,14 % pero el LSI VA DISMINUYENDO con la concentración de CO₂ (LSI del metano = 4,14 % con un 30 % de CO₂ y 65,86 % de aire).'),
('C070-0066',' de entrada en la línea 9 BAR;',' presión de activación ≤ 4,5 BAR; presión de reinicio ≥ 5,4 BAR; caudal aprox. 300 L/MIN.'),
('C070-0067','presión de reinicio ≥ 5,4 BAR;',' caudal aprox. 300 L/MIN.'),
('C070-0073','la en el cinturón), secuencia:',' 1º conectar la MÁSCARA a la salida «MÁSCARA»; 2º conectar la LÍNEA DE AIRE a la entrada «M» (Main-LÍNEA); 3º abrir el flujo de la línea de aire; 4º conectar el ERA en la entrada «R» (Reserva, «ERA»); 5º abrir el flujo de la(s) botella(s) del ERA.'),
('C070-0076','l traje, adosada a la CINTURA;',' es una BIFURCACIÓN que deriva el aire del ERA a un conjunto de TUBOS DE PLÁSTICO que lo aportan al interior del traje, y al pulmoautomático.'),
('C070-0133','po de protección respiratoria:',' TIPO 1a (ERA DENTRO del traje), TIPO 1b (ERA FUERA) y TIPO 1c (conectado a una LÍNEA DE AIRE RESPIRABLE a PRESIÓN POSITIVA).'),
('C070-0142','NO → según la exposición:','
EXPOSICIÓN DE GRAN PARTE DEL CUERPO:
- ¿Líquido con PRESIÓN en forma de CHORRO?'),
('C070-0144','RPO (torso, brazos, piernas…):','
- ¿Líquido con presión en forma de chorro o líquido pulverizado? SÍ → PRENDAS 3[PB] Ó 4[PB]. NO →
- ¿Posibles salpicaduras de un líquido? SÍ → PRENDAS 6[PB].'),
('C070-0152','ÁSICOS DE TRAJES ALUMINIZADOS:','
1. ACERCAMIENTO: para trabajos en áreas de altas temperaturas, como acerías y otros con metales fundidos, que requieren protección SUPERIOR A 100 ºC.'),
('C071-0052','R ESCALÓN Y EL MÁS IMPORTANTE:',' permite llegar a la intervención con la mejor información y recursos posibles.'),
('C071-0054','N PARA RECOGER (nueve puntos):','
1. TELÉFONO Y DIRECCIÓN.
2. TIPO DE SERVICIO: ¿SON ABEJAS O AVISPAS? (ver cuadro 2, identificación del servicio).
3. ¿DÓNDE SE ENCUENTRAN? ¿EXTERIOR O INTERIOR?
   - EXTERIOR: ¿están apiñadas en una bola? ¿En un árbol, farola, fachada, objeto aislado...? SI ESTÁ EN EL EXTERIOR Y APIÑADAS EN UNA BOLA, POSIBLEMENTE SEA UN ENJAMBRE DESNUDO, a no ser que nos digan que salen de un agujero o hueco: en ese caso…'),
('C071-0062','tambor de persiana, pared...):',' CON TODA SEGURIDAD SEA UN ENJAMBRE ESTABLECIDO O UN DESNUDO QUE SE ACABA DE METER EN UN HUECO.'),
('C071-0075','POR NIDO (INCIERTO):',' un hueco o agujero ENNEGRECIDO, se ven PANALES DE CERA → ABEJAS.'),
('C071-0081','EJOS que se dan a quien llama:','
1. NO SE ACERQUE AL ENJAMBRE y mantenga lejos a cualquier persona, MÁS SI SON NIÑOS O ANCIANOS, señalizando la zona si es posible.
2. NO INTENTE EXTERMINARLOS con venenos, insecticidas, piedras u objetos: no conseguirá nada, SOLO IRRITARLAS, y puede correr el riesgo de una PICADURA MASIVA.
3. SI SE ENCUENTRA EN FACHADA, CIERRE LAS VENTANAS PRÓXIMAS.
4. SI ESTÁN EN UNA HABITACIÓN O LOCAL, DEJE LA V'),
('C071-0106','secticidas, piedras u objetos:',' no conseguirá nada, SOLO IRRITARLAS, y puede correr el riesgo de una PICADURA MASIVA.'),
('C071-0141','SIÓN DE ESPECIALISTAS U.R.R.A.',' - AEA, en el caso de que esté en altura.'),
('C071-0144','posible ESPECIALISTAS U.R.R.A.','
- Si se requiere AEA, se incluirá en la salida de la AEA a UN ESPECIALISTA U.R.R.A.
- Si el enjambre lo recoge el Parque 2, 3 o 4, se realizará la salida completa con AEA o con vehículo ligero, MÍNIMO 2 PERSONAS.'),
('C071-0145','AEA a UN ESPECIALISTA U.R.R.A.','
- Si el enjambre lo recoge el Parque 2, 3 o 4, se realizará la salida completa con AEA o con vehículo ligero, MÍNIMO 2 PERSONAS.'),
('C071-0177','sión de especialistas U.R.R.A.',' - AEA en el caso de que esté en altura.'),
('C071-0178','posible especialistas U.R.R.A.','
- Si la intervención la realiza el Parque 2, 3 o 4, saldrá la salida completa con AEA o con vehículo ligero, mínimo 2 personas.'),
('C071-0181','RVICIOS ESPECIALISTAS U.R.R.A.','
- Un mínimo de 2 ESPECIALISTAS U.R.R.A. CON EL J-36.'),
('C071-0184','AVISPEROS OCULTOS:','
- SE DESPLAZARÁN PARA ESTE TIPO DE SERVICIOS ESPECIALISTAS U.R.R.A.
- Un mínimo de 2 ESPECIALISTAS U.R.R.A. CON EL J-36.
- Si se requiere AEA, se trasladará además un bombero conductor, o se incluirá un especialista U.R.R.A. en la salida de la AEA.'),
('C071-0199','SEIS PUNTOS A VALORAR:','
1. RIESGO REAL Y POSIBLE ALARMA SOCIAL: calle transitada, colegio, residencia, personas afectadas por picaduras.
2. LOCALIZACIÓN Y UBICACIÓN del enjambre, colmena o nido.
3. APROXIMACIÓN Y ACCESOS.
4. RIESGOS ASOCIADOS: electricidad, altura.
5. TAMAÑO del enjambre, colmena o nido.
6. TIEMPO DE MADUREZ, es decir, los días que lleva.'),
('C071-0208','IFICAR SIETE POSIBLES RIESGOS:','
1. MECÁNICOS: derivados del uso de ciertas herramientas o de realizar trabajos en altura (caída de material).
2. QUÍMICOS: derivados del uso de sustancias químicas con cierto nivel de toxicidad.
3. ELÉCTRICOS: derivados de tener que actuar próximos a instalaciones eléctricas.
4. BIOLÓGICOS: derivados del CONTACTO CON VENENO DE ABEJAS Y AVISPAS, que pueden derivar en REACCIONES ALÉRGICAS GRAVES, AU'),
('C071-0300','TERIOS GENERALES, seis reglas:','
1. NO TRABAJAR SOLO.
2. NO HACER RUIDOS ESTRIDENTES NI LLEVAR OLORES FUERTES.
3. PLANIFICAR LA INTERVENCIÓN.
4. TRABAJAR CON MUCHA TRANQUILIDAD Y PACIENCIA. MOVIMIENTOS LENTOS Y SUAVES.
5. USAR COLORES CLAROS.
6. NO BUSCAR A LA REINA. METER EL ENJAMBRE A BULTO EN LA CAJA.'),
('C071-0308',' BÁSICO (dieciséis elementos):',' ASPIRADOR · VAPORIZADOR DE AGUA · DESODORIZADOR (AGUARRÁS, CERVEZA, VINAGRE, etc.) · CINTA DE BALIZAR Y CARTELES · ESCALERA CORTA · TROZOS DE CARTÓN PARA FABRICAR RAMPAS GUÍA · MATERIAL PARA COLGAR O BAJAR UNA CAJA O NÚCLEO · EPI · CAJA CAZAENJAMBRES O NÚCLEOS DE APICULTURA · CUADROS DE CERA · FEROMONAS · CEPILLO · TIJERAS DE PODAR · PRISMÁTICOS · AHUMADOR · BOTIQUÍN.'),
('C071-0387','sa al procedimiento operativo;',' si NO, SE TRASLADA A POLICÍA Y UNIDAD VERDE para que levanten acta de la no colaboración con los servicios públicos.'),
('C071-0424','A LOCALIZACIÓN, estos métodos:','
1. SUPERFICIE PLANA VERTICAL (pared, vehículo, etc.) → MÉTODO DE ARRASTRADO O BARRIDO. Se aprovecha que SE COMPORTAN COMO UN CUERPO ÚNICO: se coloca la caja DEBAJO del enjambre y se va ARRASTRANDO HACIA ARRIBA por la pared MUY LENTAMENTE, dejando que vayan entrando. Se puede ayudar con el CEPILLO o, a falta de este, con un CARTÓN; también con CUADROS DE CERA o el ASPIRADOR.'),
('C071-0425','o, se aguanta lo que se pueda:',' CUANTO MÁS SE ESPERE, MENOS ABEJAS SE QUEDARÁN REVOLOTEANDO.'),
('C071-0427','DO → CONSENTIMIENTO INFORMADO:',' si SÍ, pasa al procedimiento operativo; si NO, SE TRASLADA A POLICÍA Y UNIDAD VERDE para que levanten acta de la no colaboración con los servicios públicos.'),
('C071-0439','3. POR NIDO (INCIERTO):',' un hueco o agujero ENNEGRECIDO, se ven PANALES DE CERA → ABEJAS.'),
('C071-0452','posible ESPECIALISTAS U.R.R.A.',' - Si se requiere AEA, se incluirá en la salida de la AEA a UN ESPECIALISTA U.R.R.A. - Si el enjambre lo recoge el Parque 2, 3 o 4, se realizará la salida completa con AEA o con vehículo ligero, MÍNIMO 2 PERSONAS.'),
('C071-0453','VEHÍCULOS, según ubicación:','
- J-36, DE USO EXCLUSIVO O BAJO SUPERVISIÓN DE ESPECIALISTAS U.R.R.A.
- AEA, en el caso de que esté en altura.
- VEHÍCULO LIGERO adaptado para transporte de abejas, desde otros parques.'),
('C071-0459','posible especialistas U.R.R.A.','
- Si la intervención la realiza el Parque 2, 3 o 4, saldrá la salida completa con AEA o con vehículo ligero, mínimo 2 personas.'),
('C071-0523','RVICIOS ESPECIALISTAS U.R.R.A.','
- Un mínimo de 2 ESPECIALISTAS U.R.R.A. CON EL J-36.'),
('C072-0012','LORARÁN ESPECIALISTAS U.R.R.A.','
- Si es un PARTICULAR, se le informa previamente de los trabajos y de los posibles daños, obteniendo AUTORIZACIÓN FIRMADA previa.'),
('C072-0112','UCTIVAS de nuevos territorios;',' DEPREDADORES POLÍFAGOS de artrópodos nativos que han causado daño considerable a la fauna autóctona de las áreas invadidas.'),
('C072-0113','RMETRINA, que son PIRETROIDES:',' insecticidas SINTÉTICOS creados para EMULAR LAS PIRETRINAS NATURALES DEL CRISANTEMO, porque estas SE DEGRADABAN FÁCILMENTE CON LA LUZ SOLAR.'),
('C073-0002','AS. Carecen de forma definida:',' los GASES tienden a ocupar TODO el recipiente adoptando su forma; un LÍQUIDO se deforma bajo la acción de SU PROPIO PESO ocupando total o parcialmente el recipiente.'),
('C073-0011',' cuerpo por unidad de volumen:',' γ = Peso (P) / Volumen (V) = mg/V = ρg [N/m³].'),
('C073-0020','superficie sobre la que actúa:',' p = F / S [N/m² = Pa].'),
('C073-0026','101325 Pa = 10,33 m.c.a.',' = 1,033 kp/cm² = 14,7 psi.'),
('C073-0048',' absoluto) = PRESIÓN ABSOLUTA;',' respecto a la presión atmosférica local = PRESIÓN RELATIVA o MANOMÉTRICA: p absoluta = p atmosférica + p relativa.'),
('C073-0051',' presión sobre la atmosférica;',' si la presión del recinto es INFERIOR a la atmosférica, SEÑALAN CERO.'),
('C073-0058','rica y de vacío son POSITIVAS;',' la presión absoluta puede ser SUPERIOR, IGUAL o INFERIOR a la atmosférica según el sistema.'),
('C073-0059','la manométrica da la absoluta;',' la atmosférica menos la de vacío da la absoluta.'),
('C073-0062',' el PROPIO PESO de la columna:',' Presión = Fuerza/Superficie = Peso/Superficie = Volumen · Peso específico / Superficie = (S·h)·(ρ·g)/S = ρgh.'),
('C073-0067',' la PRESIÓN ESTÁTICA ABSOLUTA:',' p₁ = p atm + ρgh₁; p₂ = p atm + ρgh₂; y la diferencia NO CAMBIA: p₁ − p₂ = ρg(h₁ − h₂).'),
('C073-0068','atm + ρgh₁; p₂ = p atm + ρgh₂;',' y la diferencia NO CAMBIA: p₁ − p₂ = ρg(h₁ − h₂).'),
('C073-0088','CCIÓN y provista de un ÉMBOLO;',' llena de agua y presionada con el émbolo, el agua sale por todos los agujeros PERPENDICULARMENTE a la superficie, con la MISMA VELOCIDAD y por tanto con la MISMA PRESIÓN.'),
('C073-0092','ctúa en TODAS LAS DIRECCIONES;',' por eso la presión que un líquido ejerce sobre un recipiente NO DEPENDE DE LA CANTIDAD de líquido, sino de su ALTURA.'),
('C073-0095','A) en un incendio de vivienda:',' independientemente del diámetro de manguera (Ø25, Ø38, Ø45 o Ø70 mm), la PRESIÓN EN LA BASE de la instalación vertical (rellano de la PLANTA BAJA) será LA MISMA, aunque el PESO de la instalación sea mayor cuanto mayor el diámetro.'),
('C073-0097',' es la aplicación FUNDAMENTAL:',' dos CILINDROS de DIFERENTE SECCIÓN comunicados, llenos de un líquido (normalmente AGUA o ACEITE HIDRÁULICO), con dos ÉMBOLOS ajustados en contacto con el líquido.'),
('C073-0100','INSTANTÁNEA a todo el líquido;',' por Pascal, p₁ = p₂ en la sección S₂: F₁/S₁ = F₂/S₂ → F₂ = F₁ (S₂/S₁).'),
('C073-0102','sultante es S₂/S₁ VECES mayor:',' el cociente entre secciones es la relación entre fuerza ejercida y resultante; con S₂ mucho mayor que S₁ se MULTIPLICA la fuerza.'),
('C073-0112','e rigen el flujo de un fluido:','
— PRINCIPIO DE CONSERVACIÓN DE LA MASA → se deduce la ECUACIÓN DE LA CONTINUIDAD.
— LEY DE CONSERVACIÓN DE LA ENERGÍA → se obtiene la ECUACIÓN DE BERNOULLI.
— PRINCIPIO DE LA CANTIDAD DE MOVIMIENTO → se deducen las ecuaciones para calcular las FUERZAS DINÁMICAS ejercidas por un fluido en movimiento.'),
('C073-0115',' LA VARIACIÓN DE SU VELOCIDAD:',' FLUJO PERMANENTE (o ESTACIONARIO): las condiciones de VELOCIDAD en cualquier punto NO CAMBIAN CON EL TIEMPO, o las variaciones son pequeñas respecto a los valores medios; tampoco hay cambios de densidad, presión o temperatura con el tiempo.'),
('C073-0122','DOS» a temperaturas MUY BAJAS;',' el resto presentan algo de viscosidad, pero el modelo de viscosidad nula es una APROXIMACIÓN NECESARIA para ciertas aplicaciones.'),
('C073-0125','AS VISCOSAS y es ADIMENSIONAL:',' Re = ρvD/μ (ρ densidad del fluido; v velocidad del fluido; D diámetro de la conducción; μ viscosidad dinámica).'),
('C073-0136','DAD discurre de forma CAÓTICA;',' partículas desordenadas que chocan y forman REMOLINOS; líneas de corriente predecibles solo hasta cierto punto.'),
('C073-0139','NSICIÓN: Re entre 2000 y 4000:',' parecido al laminar cuando Re es ligeramente superior a 2000, y se vuelve turbulento e impredecible poco a poco conforme se acerca a 4000.'),
('C073-0142','nducción POR UNIDAD DE TIEMPO:',' Q = V / t (Q caudal en m³/s; V volumen en m³; t tiempo en segundos).'),
('C073-0150','ante: v1·S1 = v2·S2 = Q = cte;',' por tanto Q = S·v (Q en m³/s; S sección en m²; v velocidad en m/s).')) as v(id, cola, ext)
  where b.id = v.id and right(b.cita, 30) = v.cola and (b.editada_at is null or b.id = 'C001-0021')
  returning 1)
select 'lote 9: ' || count(*) || ' de 160 citas ampliadas' as resultado from u;
