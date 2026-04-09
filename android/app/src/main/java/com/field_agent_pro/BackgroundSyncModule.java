package com.field_agent_pro;
import androidx.work.ExistingPeriodicWorkPolicy;
import androidx.work.PeriodicWorkRequest;
import androidx.work.WorkManager;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.concurrent.TimeUnit;

public class BackgroundSyncModule extends ReactContextBaseJavaModule {

    BackgroundSyncModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "BackgroundSync"; 
    }

    @ReactMethod
    public void startRouteSync() {
        // Schedule every 60 minutes
        PeriodicWorkRequest syncRequest = new PeriodicWorkRequest.Builder(
                BackgroundSyncWorker.class, 
                60, TimeUnit.MINUTES)
                .build();

        WorkManager.getInstance(getReactApplicationContext()).enqueueUniquePeriodicWork(
                "RouteSyncWork",
                ExistingPeriodicWorkPolicy.KEEP,
                syncRequest
        );
    }
}
