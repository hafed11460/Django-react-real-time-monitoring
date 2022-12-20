from apscheduler.schedulers.background import BackgroundScheduler

from plc.views import generat_data


def start():
    scheduler  = BackgroundScheduler()
    scheduler.add_job(generat_data,"interval",seconds=5)
    # scheduler.add_job(generat_data,"interval",minutes=1)
    scheduler.start()