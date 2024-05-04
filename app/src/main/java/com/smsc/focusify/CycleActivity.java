package com.smsc.focusify;

import android.os.Bundle;
import android.os.CountDownTimer;
import android.view.View;
import android.widget.ImageButton;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import java.util.Locale;
import java.util.concurrent.TimeUnit;

public class CycleActivity extends AppCompatActivity {

    private int timeSelected = 5;
    private CountDownTimer timeCountDown = null;
    private Long pauseOffSet = 0L;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_cycle);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
        ImageButton btnStart = findViewById(R.id.btnStart);
        btnStart.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                ProgressBar progressBar = findViewById(R.id.timeProgressBar);
                progressBar.setMax(timeSelected);
                startTimer();
            }
        });
    }

    private void startTimer() {
        ImageButton startBtn = findViewById(R.id.btnStart);
        start(pauseOffSet);
        startBtn.setVisibility(View.INVISIBLE);
    }

    private void start(Long pauseOffSetL) {
        ProgressBar progressBar = findViewById(R.id.timeProgressBar);
        timeCountDown = new CountDownTimer(
                TimeUnit.MINUTES.toMillis(timeSelected) - TimeUnit.MINUTES.toMillis(pauseOffSetL), 1000
        ) {
            @Override
            public void onTick(long millisUntilFinished) {
                progressBar.setMax((int) TimeUnit.MINUTES.toMillis(timeSelected));
                pauseOffSet = TimeUnit.MINUTES.toMillis(timeSelected) - millisUntilFinished;
                progressBar.setProgress( (int) millisUntilFinished);
                TextView txtTimeLeft = findViewById(R.id.txtTimeLeft);
                String text = String.format(Locale.getDefault(), "%02d : %02d",
                        TimeUnit.MILLISECONDS.toMinutes(millisUntilFinished) % 60,
                        TimeUnit.MILLISECONDS.toSeconds(millisUntilFinished) % 60);
                txtTimeLeft.setText(text);
            }

            @Override
            public void onFinish() {
                ImageButton startBtn = findViewById(R.id.btnStart);
                startBtn.setVisibility(View.VISIBLE);
            }
        }.start();
    }

}