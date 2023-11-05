import React, { useState } from "react";
import ClientForm from "../../login/client-form";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import timeGridPlugin from "@fullcalendar/timegrid";
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { getAllSchedules, shutDownSchedule } from "../../service/login.service";
import { Dialog, DialogContent, DialogContentText } from "@mui/material";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { Link } from "react-router-dom";

const Schedule = (props) => {
  const initialEvents = [
    {
      id: "00000001",
      title: "Primeiro Evento",
      description: "Evento",
      start: "2023-03-11T21:00:00",
      end: "2023-03-11T22:00:00",
    },
    {
      id: "00000001",
      title: "Primeiro Evento",
      description: "Evento",
      start: "2023-11-11T21:00:00",
      end: "2023-11-11T22:00:00",
    },
  ];
  const [events, setEvents] = useState(initialEvents);

  const [selectedDate, setSelectedDate] = useState("2023-11-11T00:00:00");
  const [addDialog, setAddDialog] = useState(false);
  const handleAddDialogClose = () => {
    setAddDialog(false);
    handleGetAllSchedules();
  };

  const [editScheduleId, setEditScheduleId] = useState("");
  const [editData, setEditData] = useState({});
  const [editDialog, setEditDialog] = useState(false);
  const handleEditDialogClose = () => {
    setEditDialog(false);
    handleGetAllSchedules();
  };

  const handleEditSchedule = (data) => {
    setEditScheduleId(data?.event._def.publicId);
    setEditData({
      ...editData,
      data: data?.event._def.extendedProps.description,
      procedimento: data?.event._def.title,
    });
    setEditDialog(true);
  };

  const handleGetAllSchedules = () => {
    const confirmation = Promise.resolve(getAllSchedules());
    confirmation
      .then((schedules) => {
        const scheduledEvents = schedules.data.map((schedule) => {
          const date = new Date(schedule.diaHoraAgendamento);
          let final = date.setHours(date.getHours() + 1);
          final = new Date(final).toISOString().replace("Z", "");
          if (schedule.statusAgendamento != 1)
            return {
              id: schedule.idAgendamento,
              title: `${schedule.nomeProcedimento} ${schedule.nomeCliente}`,
              description: schedule.diaHoraAgendamento,
              start: schedule.diaHoraAgendamento,
              end: final,
            };
          else
            return {
              id: "",
              title: "",
              description: "",
              start: "0001-01-01T00:00:00",
              end: "0001-01-01T00:00:00",
            };
        });
        setEvents(scheduledEvents);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRemoveSchedule = (id) => {
    const confirmation = Promise.resolve(shutDownSchedule(id));
    confirmation
      .then((axios) => {
        alert("Agendamento removido com sucesso");
      })
      .catch((error) => {
        alert("Erro ao salvar a empresa.");
        console.error("Erro ao salvar a empresa:", error);
      });
    handleGetAllSchedules();
  };

  React.useEffect(() => {
    handleGetAllSchedules();
  }, []);

  const openAddScheduleDialog = (props) => {
    return (
      <Dialog
        open={addDialog}
        onClose={handleAddDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <ClientForm diaHora={selectedDate} className={"edit-form"} />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
  };

  const openEditScheduleDialog = () => {
    return (
      <Dialog
        open={editDialog}
        onClose={handleEditDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <ClientForm
              id={editScheduleId}
              data={editData.data}
              className={"edit-form"}
            />
            <button
              onClick={() => {
                handleRemoveSchedule(editScheduleId);
              }}
              style={{
                color: "#FF0000",
                fontWeigth: "bold",
                border: "none",
                marginTop: "10px",
                background: "none",
              }}
            >
              Excluir agendamento
            </button>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "#0e0e0e",
          padding: "40px",
          color: "#ffffff",
          marginBottom: "20px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <EventNoteIcon />
          <h4
            style={{
              marginLeft: "10px",
            }}
          >
            Agendamento
          </h4>
        </div>
        <Link
          style={{
            color: "rgb(255, 121, 79",
            marginRight: "100px",
          }}
          to={"/login"}
        >
          Sair
        </Link>
      </div>
      {openAddScheduleDialog()}
      {openEditScheduleDialog()}
      <div style={{ padding: "50px" }}>
        <FullCalendar
          locale={"pt-br"}
          theme={true}
          themeSystem="Litera"
          headerToolbar={{
            left: "title",
            center: "",
            right: "prev,next today",
          }}
          plugins={[
            dayGridPlugin,
            interactionPlugin,
            timeGridPlugin,
            bootstrap5Plugin,
          ]}
          navLinks={true}
          editable={false}
          selectable={true}
          dateClick={(info) => {
            setSelectedDate(`${info.dateStr}T00:00:00`);
            setAddDialog(true);
          }}
          initialView="dayGridMonth"
          events={events}
          eventClick={(info) => {
            handleEditSchedule(info);
          }}
          eventDidMount={(info) => {
            return new bootstrap.Popover(info.el, {
              title: info.event.title,
              placement: "auto",
              trigger: "hover",
              customClass: "popoverStyle",
              content: new Date(info.event.start).toLocaleString(),
              html: true,
            });
          }}
        />
      </div>
    </>
  );
};
export default Schedule;
