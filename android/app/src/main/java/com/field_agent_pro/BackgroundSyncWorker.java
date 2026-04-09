package com.field_agent_pro;
import java.io.File;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase; 
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.os.Build;
import androidx.annotation.NonNull;
import androidx.core.app.NotificationCompat;
import androidx.work.Worker;
import androidx.work.WorkerParameters;

public class BackgroundSyncWorker extends Worker {

    public BackgroundSyncWorker(@NonNull Context context, @NonNull WorkerParameters workerParams) {
        super(context, workerParams);
    }

 @NonNull
@Override
public Result doWork() {
    File dbFile = getApplicationContext().getDatabasePath("app.generaldb");

    if (!dbFile.exists()) {
        return Result.success();
    }

    SQLiteDatabase db = null;
    Cursor cursor = null;
    StringBuilder customerNames = new StringBuilder();

    try {
        db = SQLiteDatabase.openDatabase(dbFile.getAbsolutePath(), null, SQLiteDatabase.OPEN_READONLY);

        cursor = db.rawQuery("SELECT customer_name FROM shipments WHERE is_deleted = 0 AND status != 'completed'", null);

        if (cursor != null && cursor.moveToFirst()) {
            do {
                if (customerNames.length() > 0) customerNames.append(", ");
                customerNames.append(cursor.getString(0));
            } while (cursor.moveToNext());
        }

        if (customerNames.length() > 0) {
            sendNotification("Active Shipments Reminder", "Customers: " + customerNames.toString());
        }

        return Result.success();

    } catch (Exception e) {
        e.printStackTrace();
        return Result.retry();
    } finally {
        if (cursor != null) cursor.close();
        if (db != null && db.isOpen()) {
            db.close();
        }
    }
}


    private void sendNotification(String title, String message) {
        NotificationManager manager = (NotificationManager) getApplicationContext().getSystemService(Context.NOTIFICATION_SERVICE);
        String channelId = "task_sync_channel";

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(channelId, "Task Sync", NotificationManager.IMPORTANCE_HIGH);
            manager.createNotificationChannel(channel);
        }

        NotificationCompat.Builder builder = new NotificationCompat.Builder(getApplicationContext(), channelId)
                .setContentTitle(title)
                .setContentText(message)
                .setSmallIcon(R.mipmap.ic_launcher)
                .setPriority(NotificationCompat.PRIORITY_HIGH)
                .setAutoCancel(true);

        manager.notify(101, builder.build());
    }
}
